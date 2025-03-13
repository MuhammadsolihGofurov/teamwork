import Head from "next/head";

const Seo = ({
  children,
  title = "New title",
  description = "New Description",
  keywords = "New Keywords",
}) => {
  return (
    <Head>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>

      {children}
    </Head>
  );
};

export default Seo;
