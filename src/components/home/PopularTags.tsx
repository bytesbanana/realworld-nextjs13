import Link from "next/link";

const PopularTags = () => (
  <>
    <p>Popular Tags</p>
    <div className="tag-list">
      <Link href="" className="tag-pill tag-default">
        programming
      </Link>
      <Link href="" className="tag-pill tag-default">
        javascript
      </Link>
      <Link href="" className="tag-pill tag-default">
        emberjs
      </Link>
      <Link href="" className="tag-pill tag-default">
        angularjs
      </Link>
      <Link href="" className="tag-pill tag-default">
        react
      </Link>
      <Link href="" className="tag-pill tag-default">
        mean
      </Link>
      <Link href="" className="tag-pill tag-default">
        node
      </Link>
      <Link href="" className="tag-pill tag-default">
        rails
      </Link>
    </div>
  </>
);

export default PopularTags;
