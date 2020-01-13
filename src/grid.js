import config from "@/config";
import {extendHex, defineGrid} from "honeycomb-grid";

const Hex = extendHex({
    size: config.grid.size,
    orientation: "flat",
});

const Grid = defineGrid(Hex);

export {Hex, Grid};
