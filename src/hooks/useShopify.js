import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import * as shopifyAPI from '@/api/shopify';

// Hook for fetching products
export const useProducts = (options = {}) => {
  const { first = 20, after = null, ...queryOptions } = options;

  return useQuery({
    queryKey: ['products', { first, after }],
    queryFn: () => shopifyAPI.getProducts(first, after),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...queryOptions,
  });
};

// Hook for paginated product loading
export const useInfiniteProducts = (options = {}) => {
  const { first = 24, enabled = true, ...queryOptions } = options;

  return useInfiniteQuery({
    queryKey: ['products-infinite', { first }],
    enabled,
    initialPageParam: null,
    queryFn: ({ pageParam }) => shopifyAPI.getProducts(first, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage?.pageInfo?.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  });
};

// Hook for fetching single product
export const useProduct = (handle, options = {}) => {
  const { enabled = true, ...queryOptions } = options;

  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => shopifyAPI.getProductByHandle(handle),
    enabled: !!handle && enabled,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...queryOptions,
  });
};

// Hook for fetching collections
export const useCollections = (options = {}) => {
  const { first = 20, ...queryOptions } = options;

  return useQuery({
    queryKey: ['collections', { first }],
    queryFn: () => shopifyAPI.getCollections(first),
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...queryOptions,
  });
};

// Hook for fetching single collection
export const useCollection = (handle, options = {}) => {
  const { first = 20, ...queryOptions } = options;

  return useQuery({
    queryKey: ['collection', handle, { first }],
    queryFn: () => shopifyAPI.getCollectionByHandle(handle, first),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...queryOptions,
  });
};

// Hook for searching products
export const useSearch = (query, options = {}) => {
  const { first = 10, ...queryOptions } = options;

  return useQuery({
    queryKey: ['search', query, { first }],
    queryFn: () => shopifyAPI.searchProducts(query, first),
    enabled: !!query && query.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...queryOptions,
  });
};

// Hook for cart operations
export const useCart = (cartId) => {
  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => shopifyAPI.getCart(cartId),
    enabled: !!cartId,
    staleTime: 1000 * 60, // 1 minute
  });
};

// Hook for adding to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lines }) => shopifyAPI.addToCart(cartId, lines),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Hook for removing from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lineIds }) => shopifyAPI.removeFromCart(cartId, lineIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Hook for updating cart lines
export const useUpdateCartLines = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lines }) => shopifyAPI.updateCartLines(cartId, lines),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Hook for creating cart
export const useCreateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lines) => shopifyAPI.createCart(lines),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Hook for customer operations
export const useCustomer = (accessToken) => {
  return useQuery({
    queryKey: ['customer', accessToken],
    queryFn: () => shopifyAPI.getCustomer(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook for customer login
export const useCustomerLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) => shopifyAPI.createCustomerAccessToken(email, password),
  });
};

// Hook for customer creation
export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: (input) => shopifyAPI.createCustomer(input),
  });
};

// Hook for debounced search
export const useDebouncedSearch = (searchTerm, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  return debouncedValue;
};

// Hook for local storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error writing to localStorage (${key}):`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// Hook for session storage
export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error writing to sessionStorage (${key}):`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// Hook for scroll position
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

// Hook for window size
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Hook for media query
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (e) => {
      setMatches(e.matches);
    };

    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query, matches]);

  return matches;
};

// Hook for previous value
export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
