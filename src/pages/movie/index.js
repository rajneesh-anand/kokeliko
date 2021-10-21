import React from "react";
import SEO from "../../components/seo";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";
import MovieContainer from "../../containers/movie/movie-grid";

const MoviePage = ({ movieData }) => {
  return (
    <Layout>
      <SEO
        title="Movie | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/movie"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <MovieContainer movieData={movieData} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  // Fetch the first page as default
  const page = query.page || 1;
  let movieData = null;
  // Fetch data from external API
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/movie?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    movieData = await res.json();
    console.log(movieData);
  } catch (err) {
    movieData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return { props: { movieData } };
};
export default MoviePage;
