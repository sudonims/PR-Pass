import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import generatePass from "pr-pass";

const features = [
  {
    title: "Easy to Use",
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Easy to use, understand and secure sensitive data more effectively. Can
        be easily installed and you can easily integrate in your platform <br />
        Go to docs <a href="docs">here</a>
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Focus on your sensitive data and passwords can be handled by this. Needs
        no network permissions, we don't have any remote storage, you can easily
        keep your password a secret by just using a number and a word and
        generating passwords on-the-go :)
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--6", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const submit = (e) => {
    e.preventDefault();
    const { key, lucky } = e.target.elements;
    const generated = generatePass(key.value, lucky.value);
    document.getElementById(
      "pass"
    ).innerHTML += `Generated Password is <b>${generated}</b> and you can easily use it by copying.<br /> See docs for more info`;
  };
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <div
            style={{
              background: "white",
              alignContent: "center",
              width: "70%",
              padding: "10px",
              borderRadius: "5px",
            }}
            className="container"
          >
            <div className="row">
              <div className="col col--6">
                <form onSubmit={submit}>
                  <input name="key" type="text" placeholder="A Word" />
                  <br />
                  <input
                    name="lucky"
                    type="number"
                    placeholder="Lucky Number (Non -ve)"
                  />
                  <br />
                  <input type="submit" />
                </form>
              </div>
              <div className="col col--6">
                <p id="pass"></p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
