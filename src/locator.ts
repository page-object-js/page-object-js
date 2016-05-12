export interface IClassNameLocator {
    className: string;
}

export interface ICssLocator {
    css: string;
}

export interface IIdLocator {
    id: string;
}

export interface IJsLocator {
    js: string;
}

export interface ILinkTextLocator {
    linkText: string;
}

export interface INameLocator {
    name: string;
}

export interface IPartialLinkTextLocator {
    partialLinkText: string;
}

export interface ITagNameLocator {
    tagName: string;
}

export interface IXpathLocator {
    xpath: string;
}

type Locator = IClassNameLocator | ICssLocator | IIdLocator | IJsLocator |
    ILinkTextLocator | INameLocator | IPartialLinkTextLocator |
    ITagNameLocator | IXpathLocator;

export default Locator;
