/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file account_.logout.jsx
 * @description Route module: account_.logout — Pawra Pet Cares page or API handler.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import {redirect} from 'react-router';

// if we don't implement this, /account/logout will get caught by account.$.tsx to do login

export async function loader() {
  return redirect('/');
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({context}) {
  return context.customerAccount.logout();
}

/** @typedef {import('./+types/account_.logout').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */
