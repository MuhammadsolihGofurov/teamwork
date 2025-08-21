import Head from "next/head";

const Seo = ({
  children,
  title = "New title",
  description = "New Description",
  keywords = "New Keywords",
  link = "https://teamworkuz.vercel.app/",
}) => {
  return (
    <Head>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={link} />
      <meta property="og:site_name" content="Teamwork.uz" />

      <meta
        property="og:image"
        content="https://teamworkuz.vercel.app/og/cover-1200x630.jpg"
      />
      <meta
        property="og:image:secure_url"
        content="https://teamworkuz.vercel.app/og/cover-1200x630.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Teamwork.uz platform preview" />

      <meta property="og:locale" content="uz_UZ" />
      <meta property="og:locale:alternate" content="ru_RU" />
      {/* <meta property="og:locale:alternate" content="en_US" /> */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://teamworkuz.vercel.app/og/cover-1200x630.jpg"
      />
      <meta name="twitter:site" content="@teamwork_uz" />
      <meta name="twitter:creator" content="@teamwork_uz" />

      <link rel="canonical" href="https://teamworkuz.vercel.app/" />

      {children}
    </Head>
  );
};

export default Seo;
