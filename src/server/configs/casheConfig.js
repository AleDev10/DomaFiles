import { Directory, Paths } from 'expo-file-system';

export function casheConfig() {
  const cache = new Directory(Paths.cache);

  if (cache.exists) {
    for (const item of cache.list()) {
      item.delete();
    }
  }
}