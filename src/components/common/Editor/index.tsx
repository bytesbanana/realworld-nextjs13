import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { FormEventHandler, ChangeEventHandler } from "react";
import type { Article, EditorMode } from "lib/types/articles";

import styles from "./Editor.module.css";
import TagsInput from "./TagsInput";

interface Props {
  article?: Article;
  mode: EditorMode;
  onSubmit: (formData: EditorFormData) => void;
}

export interface EditorFormData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

const defaultFormData: EditorFormData = {
  title: "",
  description: "",
  body: "",
  tagList: [],
};

type InputChangeEvent = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

const Editor = ({ article, mode, onSubmit }: Props) => {
  const [form, setFormData] = useState<EditorFormData>(
    mode === "UPDATE" && article
      ? {
          title: article?.title || "",
          description: article?.description || "",
          body: article?.body,
          tagList: article?.tagList,
        }
      : defaultFormData
  );
  const [previewMD, setPreviewMD] = useState<boolean>(false);

  const handleInputChange: InputChangeEvent = (e) => {
    const { value, name } = e.target;
    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleTagListChange = (tagList: string[]) => {
    setFormData((p) => ({ ...p, tagList }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={form.title}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={form.description}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows={8}
            placeholder="Write your article (in markdown)"
            id="body"
            name="body"
            onChange={handleInputChange}
            value={form.body}
          />

          {previewMD && (
            <div className={styles.editor}>
              <ReactMarkdown className="form-control">
                {form.body}
              </ReactMarkdown>
            </div>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            style={{ margin: "0.22rem 0" }}
            onClick={(e) => {
              e.preventDefault();
              setPreviewMD((p) => !p);
            }}
            name="btnPreivewToggle"
            id="btnPreivewToggle"
          >
            {!previewMD ? "Show Preview" : "Hide Preview"}
          </button>
        </fieldset>
        <fieldset className="form-group">
          <TagsInput
            onTagListChange={handleTagListChange}
            initTags={form.tagList}
          />
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
};

export default Editor;
