import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

export const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => {
    return <h1 {...props} className="text-3xl text-pale-yellow mt-8 mb-6" />;
  },

  h2: (props: ComponentPropsWithoutRef<"h2">) => {
    return <h2 {...props} className="text-2xl text-pale-yellow mt-8 mb-6" />;
  },

  h3: (props: ComponentPropsWithoutRef<"h3">) => {
    return <h3 {...props} className="text-xl text-pale-yellow mt-8 mb-6" />;
  },

  h4: (props: ComponentPropsWithoutRef<"h4">) => {
    return <h4 {...props} className="text-lg text-pale-yellow mt-8 mb-6" />;
  },

  h5: (props: ComponentPropsWithoutRef<"h5">) => {
    return <h5 {...props} className="text-base text-pale-yellow mt-8 mb-6" />;
  },

  h6: (props: ComponentPropsWithoutRef<"h6">) => {
    return <h6 {...props} className="text-base text-pale-yellow mt-8 mb-6" />;
  },

  p: (props: ComponentPropsWithoutRef<"p">) => {
    return (
      <p {...props} className="py-2 text-left text-sm md:text-lg font-semibold text-gray-500 dark:text-white" />
    );
  },

  a: (props: ComponentPropsWithoutRef<"a">) => {
    return (
      <span className="decoration-sky-500">
        {props.href ? (
          <Link
            href={props.href}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="decoration-sky-500 underline text-blue-600" {...props} />
          </Link>
        ) : (
          <a {...props} className="decoration-sky-500 " />
        )}
      </span>
    );
  },

  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="my-2 font-light" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="my-3 list-decimal list-inside" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="my-3 list-disc list-inside" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="pl-4 italic" {...props} />
  ),
};