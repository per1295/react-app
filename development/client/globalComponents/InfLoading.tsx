import { useInfBarLoading } from "../customHooks";

import "../globalStyles/InfLoading.scss";

export default function InfLoading() {
    const loader = useInfBarLoading("infLoading");

    return loader;
}