import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function NextLink({ url, children, className, ...pageProps }) {
  const router = useRouter();

  if (!url) {
    return null;
  }

  return (
    <Link href={`/${router.locale}/${url}`}>
      <a className={className}>{children}</a>
    </Link>
  );
}
