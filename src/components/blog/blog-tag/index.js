import { containsObject, flatDeep, slugify } from "@/utils/index";

const BlogTag = ({ tags }) => {
  // const tags = BlogData.map((item) => {
  //   return item.tags;
  // });
  let singleTagArray = flatDeep(tags);
  let allTags = [];
  singleTagArray.forEach((tag) => {
    const obj = {
      title: tag.trim(),
      slug: slugify(tag),
    };
    const objIndex = containsObject(obj, allTags);
    if (objIndex !== -1) {
      allTags[objIndex] = {
        title: tag.trim(),
        slug: slugify(tag),
      };
    } else {
      allTags.push(obj);
    }
  });
  return (
    <div className="widget-tags">
      <span>Tags:</span>
      {allTags.map((tag, i) => {
        return (
          <div key={i} className="tags">
            <h6>{tag.title}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default BlogTag;
