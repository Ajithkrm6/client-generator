/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="react" />
/// <reference types="react/jsx-runtime" />

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

declare global {
  namespace JSX {
    interface Element {}
    interface ElementClass {
      render(): any
    }
    interface ElementAttributesProperty {
      props: any
    }
    interface ElementChildrenAttribute {
      children: any
    }
    type LibraryManagedAttributes<C, P> = any
  }
}

export {}

