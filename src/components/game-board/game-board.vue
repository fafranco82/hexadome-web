<template>
    <div class="game-board" ref="viewport">
        <panZoom :options="{minZoom: 0.1, maxZoom: 10}" @init="initZoom">
            <v-stage :config="canvas" @click="canvasClicked">
                <v-layer>
                    <GameTile :hex="hex" v-for="hex in grid" :key="hexId(hex)" />
                </v-layer>
            </v-stage>
        </panZoom>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import config from "@/config";
import {Grid} from "@/grid";

import GameTile from "@/components/game-board/game-tile";

export default {
    components: {
        GameTile,
    },
    data() {
        return {
            zoom: undefined,
        };
    },
    computed: {
        ...mapGetters(["grid"]),
        canvas() {
            return {
                width: 3 * config.grid.radius * config.grid.size + 2 * config.grid.size,
                height: (2 * config.grid.radius + 2) * (config.grid.size * Math.sqrt(3)),
            };
        },
        viewport() {
            let rect = this.$refs.viewport.getBoundingClientRect();
            return {
                width: rect.width,
                height: rect.height,
            };
        },
    },
    methods: {
        ...mapActions(["sendGameCommand"]),
        initZoom(zoomInstance) {
            this.zoom = zoomInstance;
            this.fitAndCenter();
            //this.zoom.pause();
        },
        fitAndCenter() {
            let scaleW = this.viewport.width / this.canvas.width;
            let scaleH = this.viewport.height / this.canvas.height;

            let scale = 0;
            let x = 0;
            let y = 0;

            if (scaleW <= scaleH) {
                scale = scaleW;
                y = this.viewport.height / 2 - (this.canvas.height * scale) / 2;
            } else {
                scale = scaleH;
                x = this.viewport.width / 2 - (this.canvas.width * scale) / 2;
            }

            this.zoom.zoomAbs(0, 0, scale);
            this.zoom.moveTo(x, y);
        },
        hexId(hex) {
            return `${hex.x},${hex.y}`;
        },
        canvasClicked(event) {
            let evt = event.evt;
            let hexCoordinates = Grid.pointToHex([evt.offsetX, evt.offsetY]);
            let hex = this.grid.get(hexCoordinates);
            if (hex) {
                console.log(hex);
                this.sendGameCommand({command: "hexClicked", args: [hex.x, hex.y]});
                hex.content.forEach(piece => {
                    this.sendGameCommand({command: "pieceClicked", args: [piece.uuid]});
                });
            }
        },
    },
};
</script>

<style lang="scss">
.game-board {
    overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>
