export const About = () => {
  return (
    <section
      id="about"
      aria-label="About me"
      className="scroll-mt-16 lg:scroll-mt-24"
    >
      <div className="bg-secondary/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-primary text-sm font-bold uppercase tracking-widest lg:sr-only">
          About
        </h2>
      </div>
      <div className="space-y-4">
        <p>
          Back in 2012, I decided to try my hand at creating custom Tumblr
          themes and tumbled head first into the rabbit hole of coding and web
          development. Fast-forward to today, and I&rsquo;ve had the privilege
          of building software for an{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://us.mullenlowe.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="advertising agency (opens in a new tab)"
          >
            advertising agency
          </a>
          , a{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://starry.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="start-up (opens in a new tab)"
          >
            start-up
          </a>
          , a{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://www.apple.com/apple-music/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="huge corporation (opens in a new tab)"
          >
            huge corporation
          </a>
          , and a{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://upstatement.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="digital product studio (opens in a new tab)"
          >
            digital product studio
          </a>
          .
        </p>
        <p>
          My main focus these days is building accessible user interfaces for
          our customers at{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://www.klaviyo.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Klaviyo (opens in a new tab)"
          >
            Klaviyo
          </a>
          . I most enjoy building software in the sweet spot where design and
          engineering meet — things that look good but are also built well under
          the hood. In my free time, I&rsquo;ve also released an{' '}
          <a
            className="hover:text-info focus-visible:text-info text-primary font-medium"
            href="https://www.newline.co/courses/build-a-spotify-connected-app"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="online video course (opens in a new tab)"
          >
            online video course
          </a>{' '}
          that covers everything you need to know to build a web app with the
          Spotify API.
        </p>
      </div>
    </section>
  )
}
