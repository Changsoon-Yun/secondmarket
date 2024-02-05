import { db } from '@/lib/firebase/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export interface FilterOptions {
  option: 'updatedAt' | 'price';
  direction: 'desc' | 'asc';
}
interface Options {
  category: string;
  filter: FilterOptions;
}
interface Product {
  id: string;
  imageList: string[];
  uid: string;
  title: string;
  price: number;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  desc: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
export default function useGetCategoryProducts({ category, filter }: Options) {
  const fetchData = async (
    lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  ) => {
    const q = !lastVisible
      ? query(
          collection(db, `products`),
          where('category', '==', category),
          orderBy(filter.option, filter.direction),
          limit(8)
        )
      : query(
          collection(db, `products`),
          where('category', '==', category),
          orderBy(filter.option, filter.direction),
          startAfter(lastVisible),
          limit(8)
        );
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return { products, querySnapshot };
  };

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`products`, category, filter],
    initialPageParam: undefined,
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
    }) => fetchData(pageParam),
    enabled: !!category,
    getNextPageParam: (lastPage) => {
      const lastVisible = lastPage.querySnapshot.docs[lastPage.querySnapshot.docs.length - 1];
      if (lastPage.querySnapshot.size < 8) {
        return undefined;
      } else {
        return lastVisible;
      }
    },
  });

  const [inViewRef, inView] = useInView({});

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { products, fetchNextPage, isFetchingNextPage, hasNextPage, inViewRef };
}