import React, {useEffect, useState} from 'react';
import styles from "./tagsList.module.scss";


interface TagsListProps {
  tags: string[];
  onChecked: any;
}

const TagsList: React.FC<TagsListProps> = ({tags, onChecked}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    onChecked(selectedTags)
    // console.log(selectedTags)
  }, [selectedTags])

  const handleTagToggle = (tag: string) => {
    // console.log(tags)
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  return (
    <div className={styles.tagslist}>
      {/*<button type="button" onClick={handleClick}>Check inputs</button>*/}
      {tags.map((tag, index) => (

        <label
          key={index}
          className={styles.tag}>

          <input
            className={styles.checkbox}
            name={tag}
            value={tag}
            type="checkbox"
            onChange={() => handleTagToggle(tag)}

          />
          <span className={styles.spanmark}>{tag}</span>
        </label>
      ))}
    </div>
  );
};

export default TagsList;
