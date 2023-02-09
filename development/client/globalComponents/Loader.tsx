import { useInfBarLoading } from "../customHooks";

import "../globalStyles/Loader.scss";

export default function Loader() {
    const loader = useInfBarLoading("loader");

    return loader
}