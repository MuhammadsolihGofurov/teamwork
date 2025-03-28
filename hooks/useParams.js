import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLang } from "@/context/useLang";

export const useParams = () => {
  const { setLangUrls } = useLang();
  const router = useRouter();
  const [breadParams, setBreadParams] = useState({});

  const updateParams = (key, value) => {
    const currentQuery = { ...router.query };
    if (value) {
      currentQuery[key] = value;
    } else {
      delete currentQuery[key];
    }
    router.push({ pathname: router.pathname, query: currentQuery }, undefined, {
      shallow: true,
    });
  };

  const checkParams = (key, value) => {
    return router.query[key] === value;
  };

  const findParams = (key) => {
    return router.query[key] || null;
  };

  const removeParams = (key) => {
    const updatedQuery = { ...router.query };
    delete updatedQuery[key];
    router.push({ pathname: router.pathname, query: updatedQuery }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    setBreadParams(router.query);
  }, [router.query]);

  return {
    updateParams,
    checkParams,
    findParams,
    removeParams,
    breadParams,
  };
};
