/**
 * WaveSpeed AI REST client — image-to-video generation (server-side only).
 * @see https://wavespeed.ai/docs/rest-api
 */

const API_BASE = 'https://api.wavespeed.ai/api/v3';
const DEFAULT_MODEL = 'alibaba/wan-2.6/image-to-video';

/**
 * @param {string} apiKey
 * @param {string} modelPath
 * @param {Record<string, unknown>} payload
 */
export async function submitWavespeedTask(apiKey, modelPath, payload) {
  const res = await fetch(`${API_BASE}/${modelPath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok || json.code !== 200) {
    throw new Error(json.message || `WaveSpeed submit failed (${res.status})`);
  }

  const taskId = json.data?.id;
  if (!taskId) {
    throw new Error('WaveSpeed response missing task id');
  }

  return taskId;
}

/**
 * @param {string} apiKey
 * @param {string} taskId
 * @param {{ intervalMs?: number; timeoutMs?: number }} [options]
 * @returns {Promise<string>} output video URL
 */
export async function pollWavespeedResult(apiKey, taskId, options = {}) {
  const {intervalMs = 5000, timeoutMs = 600000} = options;
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const res = await fetch(`${API_BASE}/predictions/${taskId}/result`, {
      headers: {Authorization: `Bearer ${apiKey}`},
    });

    const json = await res.json();
    if (!res.ok || json.code !== 200) {
      throw new Error(json.message || `WaveSpeed poll failed (${res.status})`);
    }

    const status = json.data?.status;
    if (status === 'completed') {
      const output = json.data?.outputs?.[0];
      if (!output) throw new Error(`Task ${taskId} completed with no outputs`);
      return output;
    }

    if (status === 'failed') {
      throw new Error(json.data?.error || `Task ${taskId} failed`);
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Task ${taskId} timed out after ${timeoutMs}ms`);
}

/**
 * @param {string} apiKey
 * @param {{
 *   prompt: string;
 *   image: string;
 *   duration?: number;
 *   resolution?: string;
 *   model?: string;
 * }} params
 */
export async function generateImageToVideo(apiKey, params) {
  const {
    prompt,
    image,
    duration = 5,
    resolution = '720p',
    model = DEFAULT_MODEL,
  } = params;

  const taskId = await submitWavespeedTask(apiKey, model, {
    prompt,
    image,
    duration,
    resolution,
    seed: -1,
  });

  return pollWavespeedResult(apiKey, taskId);
}
