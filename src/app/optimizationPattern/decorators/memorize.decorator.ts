export function memo() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!originalMethod.cache) {
        originalMethod.cache = new Map();
      }

      const cacheKey = JSON.stringify(args);
      if (originalMethod.cache.has(cacheKey)) {
        return originalMethod.cache.get(cacheKey);
      }

      const result = originalMethod.apply(this, args);
      originalMethod.cache.set(cacheKey, result);
      return result;
    };

    return descriptor;
  };
}
