import "./index.scss"

export function Footer(){
    return(
        <section className="footer">
          <div className="share">
            <a
              href="https://www.instagram.com/fyzz.jorge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios/ffffff/instagram-new--v1.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/jorge-nathanael-torfyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/ffffff/linkedin.png"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://github.com/desv-jorge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/ffffff/github.png"
                alt="GitHub"
              />
            </a>
          </div>
      <h2 className="title">NATHANAEL JORGE</h2>
    </section>
    )
}