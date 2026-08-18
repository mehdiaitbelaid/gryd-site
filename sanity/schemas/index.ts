import { author } from "./author";
import { category } from "./category";
import { closing } from "./closing";
import { cover } from "./cover";
import { headline } from "./headline";
import { newsItem } from "./newsItem";
import { post } from "./post";
import { project } from "./project";
import { blocks } from "./blocks";

export const schemaTypes = [
  author,
  category,
  headline,
  cover,
  closing,
  ...blocks,
  project,
  post,
  newsItem,
];
