import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useIsCurrentPage = (href: string) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsCurrentPage(false);

    if (href === router.asPath) {
      setIsCurrentPage(true);
    }
  }, [router.asPath, setIsCurrentPage, href]);

  return isCurrentPage;
};

export default useIsCurrentPage;
