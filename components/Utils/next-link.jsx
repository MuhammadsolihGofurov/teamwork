import Link from "next/link";
import React from "react";

export default function NextLink({ url, children, className, title, ...pageProps }) {

  // if (url) {
  //   return null;
  // }

  return (
    <Link href={`/${url}`}>
      <a className={className} role="link" title={title}>{children}</a>
    </Link>
  );
}
