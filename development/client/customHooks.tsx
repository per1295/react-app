import { useSelector } from "react-redux";
import { State } from "./store/types";
import React, {
    useState,
    useEffect,
    RefObject,
    useMemo,
    useContext,
    Dispatch,
    SetStateAction,
    useRef
} from "react";
import cookie from "cookiejs";
import { IBlog } from "../types/blog.js";

import { BlogsContext } from "./blog/components/TheMainBlogBody";
import { CommentVisibleContext, IdContext } from "./blog/components/MainBlogBodyItem";

export function useTypedSelector<Key extends keyof State>(func: (state: State) => State[Key]) {
    return useSelector(func);
}

export { useDispatch } from "react-redux";

interface FormElement {
    formElem: HTMLInputElement | HTMLTextAreaElement;
    name: string;
    value: string;
    isError: boolean;
    errorMessage: string;
}

interface FormData {
    [ index: string ]: string;
}

export function useFormValidation(formRef: RefObject<HTMLFormElement>) {
    const [ formElements, setFormElements ] = useState<FormElement[]>([]);
    const [ formData, setFormData ] = useState<any>({});

    function checkFormElem(event: Event) {
        setFormElements(state => {
            const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            let newFormElementObject: FormElement;
            if ( value.length === 0 ) {
                formElem.value = "Input value missing";
                formElem.classList.add("errorInput");
                newFormElementObject = {
                    formElem,
                    name,
                    value,
                    errorMessage: "Input value missing",
                    isError: true
                };
                restFormElements.push(newFormElementObject);
                return restFormElements;
            }
            return state;
        });
    }

    function focusFormElem(event: Event) {
        const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        if ( formElem.value.toLowerCase() === "input value missing" ) formElem.value = "";
        formElem.classList.remove("errorInput");

        setFormElements(state => {
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            const formElementObject: FormElement = {
                formElem,
                name,
                value,
                isError: false,
                errorMessage: ""
            };
            restFormElements.push(formElementObject);
            return restFormElements;
        });
    }

    function inputFormElem(event: Event) {
        const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        setFormElements(state => {
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            const newFormElementObject = {
                formElem,
                name,
                value,
                isError: false,
                errorMessage: ""
            };
            restFormElements.push(newFormElementObject);
            return restFormElements;
        });
    }

    useEffect(() => {
        const form = formRef.current as HTMLFormElement;
        const formChildren = Array.from(form.children).filter(child => {
            const tag = child.tagName.toLowerCase();
            return tag === "input" || tag === "textarea";
        }) as (HTMLInputElement | HTMLTextAreaElement)[];
        const newFormElements: FormElement[] = [];

        formChildren.forEach(formElem => {
            formElem.addEventListener("blur", checkFormElem);
            formElem.addEventListener("focus", focusFormElem);
            formElem.addEventListener("input", inputFormElem);

            const newElemObject: FormElement = {
                formElem,
                name: formElem.name,
                value: formElem.value,
                isError: !formElem.value.length,
                errorMessage: !formElem.value.length ? "input value missing" : ""
            };
            
            newFormElements.push(newElemObject);
        });

        setFormElements(newFormElements);

        return () => {
            Array.from(formChildren).forEach(formElem => {
                formElem.removeEventListener("blur", checkFormElem);
                formElem.removeEventListener("focus", focusFormElem);
                formElem.removeEventListener("input", inputFormElem);
            });
        }
    }, []);

    useEffect(() => {
        const newFormData = formElements.reduce((obj, item) => {
            const { name, value } = item;
            if ( name && value ) obj[name] = value;
            return obj;
        }, {} as FormData);
        setFormData(newFormData);
    }, [ formElements ]);

    return { formData, formElements };
}

export function useDatalist(name: string) {
    const [ options, setOptions ] = useState<string[]>([]);

    useEffect(() => {
        const cookieName = cookie.get(name);
        if ( typeof cookieName === "boolean" ) return;
        const inputCookie = decodeURIComponent(cookieName);
        const arrayInputCookie = inputCookie.split(/\_/g);
        setOptions(arrayInputCookie);
    }, []);

    const datalistElement = useMemo(() => (
        options.length === 0
        ?
        null
        :
        <datalist id={name}>
            {
                options.map((item, index) => (
                    <option key={index} value={item}>{ item }</option>
                ))
            }
        </datalist>
    ), [ options ]);

    return datalistElement;
}

export function useBlogData(id: string) {
    const { blogs, setBlogs } = useContext(BlogsContext);
    if ( !blogs ) throw new TypeError("Cannot get blogs data");

    const blogData = useMemo<IBlog | undefined>(() => blogs ? blogs.find(item => item.id === id) : undefined, [ blogs ]);
    if ( !blogData ) throw new TypeError("Cannot find blog data");

    function setBlogData(arg: IBlog | ((state: IBlog) => IBlog)) {
        setBlogs(state => (
            state.map(blog => {
                if ( blog.id === id ) {
                    return arg instanceof Function ? arg(blog) : arg;
                } else {
                    return blog;
                }
            })
        ));
    }

    return { blogData, setBlogData };
}

export function useIdOfBlog() {
    const id = useContext(IdContext);
    return id;
}

export function useCommentVisible() {
    const commentVisibleContext = useContext(CommentVisibleContext);
    return commentVisibleContext;
}

interface UseTransformedResponseReturn<DataType> {
    data: DataType | null
    setData: Dispatch<SetStateAction<DataType>>;
}

type UseTransformedResponseArg = Response | Promise<Response>;

export function useTransformedResponse<DataType>(responseArg?: UseTransformedResponseArg, ...fields: string[]) {
    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        (async () => {
            if ( !responseArg ) return;
            const resolvedResponse = await responseArg;
            let mimeType = resolvedResponse.headers.get("Content-Type");
            let result: any;
            let endedResult: any;
    
            if ( mimeType && !resolvedResponse.bodyUsed ) {
                mimeType = mimeType.trim();
    
                if ( /^application\/json/.test(mimeType) ) {
                    result = await resolvedResponse.json();
                } else if ( /^text/.test(mimeType) ) {
                    result = await resolvedResponse.text();
                } else {
                    result = await resolvedResponse.text();
                }
                
                if ( fields.length && result instanceof Object ) {
                    endedResult = {};
    
                    for ( let field of fields ) {
                        if ( field in result ) {
                            endedResult[field] = result[field];
                        }
                    }
    
                    if ( Object.entries(endedResult).length === 1 ) {
                        endedResult = endedResult[Object.keys(endedResult)[0]];
                    }
                } else {
                    endedResult = result;
                }
    
                setData(endedResult);
            }
        })();
    }, [ responseArg ]);

    return { data, setData } as UseTransformedResponseReturn<DataType>;
}

interface NavigationAnimationHookProps {
    navigationConteinerRef: RefObject<HTMLElement>;
    condition: boolean;
    appearFrame?: Keyframe;
    duration?: number;
    appearChildFrame?: Keyframe;
    disappearChildFrame?: Keyframe;
    childDuration?: number;
    delayStep?: number;
    preCallback?: () => any | void;
    postCallback?: () => any | void;
}

export function useNavigationAnimation
(
    {
        navigationConteinerRef, condition, appearFrame,
        duration = 500, appearChildFrame, disappearChildFrame, childDuration = 300, delayStep = 300,
        preCallback, postCallback
    }: NavigationAnimationHookProps
): void
{
    const lastAnimatedIndexRef = useRef<number | null>(0);
    const lastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const effectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const navLinksElem = navigationConteinerRef.current as HTMLDivElement;
            const navLinksChildren = Array.from(navLinksElem.children) as HTMLAnchorElement[];
            const lastAnimatedIndex = lastAnimatedIndexRef.current;
            const lastTimeout = lastTimeoutRef.current;
            const effectTimeout = effectTimeoutRef.current;
            const delayForEffectTimeout = 300 + (navLinksChildren.length - 1) * delayStep;

            if ( condition ) {
                if ( appearFrame ) {
                    if ( preCallback ) preCallback();

                    const existsNavLinksElemAnimation = navLinksElem.getAnimations().at(0);

                    if ( existsNavLinksElemAnimation && postCallback ) {
                        if ( effectTimeout ) {
                            clearTimeout(effectTimeout);
                            effectTimeoutRef.current = null;
                        }

                        effectTimeoutRef.current = setTimeout(() => {
                            existsNavLinksElemAnimation.removeEventListener("finish", postCallback);
                        }, delayForEffectTimeout);
                    }

                    const computedStyles = getComputedStyle(navLinksElem);
                    const styles = Object.keys(appearFrame);
                    const startFrame = Object.fromEntries(
                        Object
                        .entries(computedStyles)
                        .filter(([ key ]) => styles.includes(key) )
                    ); 

                    const navLinksElemAnimation = navLinksElem.animate([
                        startFrame,
                        appearFrame
                    ], {
                        duration,
                        easing: "ease",
                        fill: 'forwards'
                    });

                    navLinksElemAnimation.persist();
                }

                if ( appearChildFrame && disappearChildFrame ) {
                    navLinksChildren.forEach((navLink, index) => {
                        if ( lastTimeout ) {
                            clearTimeout(lastTimeout);
                            lastTimeoutRef.current = null;
                        }
    
                        const animations = navLink.getAnimations();
    
                        animations.forEach(animation => animation.pause());
    
                        if ( lastAnimatedIndex && navLinksChildren.length - 1 - index > lastAnimatedIndex ) return;
    
                        const computedChildStyles = getComputedStyle(navLink);
    
                        if ( /^1$/.test(computedChildStyles.opacity) ) return;
    
                        const delay =
                        lastAnimatedIndex
                        ?
                        delayStep * Math.abs(navLinksChildren.length - 1 - index - lastAnimatedIndex)
                        :
                        delayStep * index;
    
                        const childStyles = Object.keys(appearChildFrame);
                        const startChildFrame = Object.fromEntries(
                            Object
                            .entries(computedChildStyles)
                            .filter(([ key ]) => childStyles.includes(key) )
                        ); 
                        
                        const navLinkAnimation = navLink.animate([
                            startChildFrame,
                            appearChildFrame
                        ], {
                            duration: childDuration,
                            delay,
                            fill: "forwards",
                            easing: "ease"
                        });
    
                        navLinkAnimation.persist();
    
                        lastTimeoutRef.current = setTimeout(() => lastAnimatedIndexRef.current = index);
                    });
                }
            } else {
                if ( appearChildFrame && disappearChildFrame ) {
                    navLinksChildren.reverse().forEach((navLink, index) => {
                        if ( lastTimeout ) {
                            clearTimeout(lastTimeout);
                            lastTimeoutRef.current = null;
                        }
    
                        const animations = navLink.getAnimations();
    
                        if ( !animations.length ) return;
    
                        animations.forEach(animation => animation.pause());
    
                        if ( lastAnimatedIndex && navLinksChildren.length - 1 - index > lastAnimatedIndex ) return;
    
                        const computedChildStyles = getComputedStyle(navLink);
    
                        if ( /^0$/.test(computedChildStyles.opacity) ) return;
    
                        const delay =
                        lastAnimatedIndex
                        ?
                        delayStep * Math.abs(navLinksChildren.length - 1 - index - lastAnimatedIndex)
                        :
                        delayStep * index;
    
                        const childStyles = Object.keys(appearChildFrame);
                        const startChildFrame = Object.fromEntries(
                            Object
                            .entries(computedChildStyles)
                            .filter(([ key ]) => childStyles.includes(key) )
                        ); 
    
                        const navLinkAnimation = navLink.animate([
                            startChildFrame,
                            disappearChildFrame
                        ], {
                            duration: childDuration,
                            delay,
                            fill: "forwards",
                            easing: "ease"
                        });
    
                        navLinkAnimation.persist();
    
                        lastTimeoutRef.current = setTimeout(() => lastAnimatedIndexRef.current = index);
                    });
                }

                const navLinksElemAnimation = navLinksElem.getAnimations().at(0);

                if ( navLinksElemAnimation ) {
                    if ( postCallback ) {
                        if ( effectTimeout ) {
                            clearTimeout(effectTimeout);
                            effectTimeoutRef.current = null;
                        }

                        effectTimeoutRef.current = setTimeout(() => {
                            navLinksElemAnimation.addEventListener("finish", postCallback);
                        }, delayForEffectTimeout);
                    }

                    setTimeout(() => navLinksElemAnimation.reverse(), duration - 300);
                }
            }
        });

        return () => {
            clearTimeout(timeout);
        }
    }, [ condition ]);
}

export function useInfBarLoading(className: string) {
    const loading = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadingElem = loading.current as HTMLDivElement;
        const barElem = loadingElem.firstElementChild as HTMLDivElement;

        const { width: loadingWidth } = getComputedStyle(loadingElem);
        const { width: barWidth } = getComputedStyle(barElem);
        const endTranslate = parseFloat(loadingWidth) - parseFloat(barWidth);

        barElem.animate([
            {
                transform: "translateX(0) scaleX(1)"
            },
            {
                transform: `translateX(${endTranslate / 2}px) scaleX(2)`
            },
            {
                transform: `translateX(${endTranslate}px) scaleX(1)`
            }
        ], {
            duration: 1000,
            easing: "ease",
            direction: "alternate",
            iterations: Infinity
        });
    }, []);

    return(
        <div ref={loading} className={className}>
            <div className={`${className}_bar`}></div>
        </div>
    )
}