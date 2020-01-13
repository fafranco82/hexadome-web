<template>
    <div v-if="active" class="dicetray">
        <b-card header-class="p-2" body-class="p-2">
            <template v-slot:header>
                Dice Tray
            </template>
            <div class="player-tray top" :class="[topPlayer.team]" v-if="activeTop">
                <div class="player-name">
                    {{ topPlayer.name }}
                </div>
                <div class="player-dice" v-if="topPlayer.diceTray.dice.length > 0">
                    <div v-for="die in topPlayer.diceTray.dice" :key="die.uuid" class="die">
                        <img :src="dieUrl(die)" />
                    </div>
                </div>
                <div class="player-symbols" v-if="topPlayer.diceTray.symbols.length > 0">
                    <SymbolPanel
                        :symbol="symbol"
                        v-for="(symbol, index) in topPlayer.diceTray.symbols"
                        :key="`symbol-${index}`"
                    ></SymbolPanel>
                </div>
            </div>
            <div class="player-tray bottom" :class="[bottomPlayer.team]" v-if="activeBottom">
                <div class="player-name">
                    {{ bottomPlayer.name }}
                </div>
                <div class="player-dice" v-if="bottomPlayer.diceTray.dice.length > 0">
                    <div v-for="die in bottomPlayer.diceTray.dice" :key="die.uuid" class="die">
                        <img :src="dieUrl(die)" />
                    </div>
                </div>
                <div class="player-symbols" v-if="bottomPlayer.diceTray.symbols.length > 0">
                    <SymbolPanel
                        :symbol="symbol"
                        v-for="(symbol, index) in bottomPlayer.diceTray.symbols"
                        :key="`symbol-${index}`"
                    ></SymbolPanel>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
import SymbolPanel from "@/components/symbol-panel";

export default {
    components: {
        SymbolPanel,
    },
    props: {
        topPlayer: {
            type: Object,
            default: function() {
                return {
                    diceTray: {
                        dice: [],
                        symbols: [],
                    },
                };
            },
        },
        bottomPlayer: {
            type: Object,
            default: function() {
                return {
                    diceTray: {
                        dice: [],
                        symbols: [],
                    },
                };
            },
        },
    },
    computed: {
        activeTop() {
            return this.topPlayer.diceTray.dice.length + this.topPlayer.diceTray.symbols.length > 0;
        },
        activeBottom() {
            return this.bottomPlayer.diceTray.dice.length + this.bottomPlayer.diceTray.symbols.length > 0;
        },
        active() {
            return this.activeTop || this.activeBottom;
        },
    },
    methods: {
        dieUrl(die) {
            return `/images/dice/${die.color}-${die.side}.png`;
        },
        symbolUrl(symbol) {
            return `@icon/${symbol}.svg`;
        },
    },
};
</script>

<style lang="scss">
.dicetray {
    min-width: 300px;
}

.player-tray {
    display: flex;
    flex-flow: column nowrap;
    padding: 5px 0px;
}

.player-name {
    font-size: 1.1em;
    font-weight: bold;
}

.player-dice {
    display: flex;
    flex-flow: row wrap;
    border-width: 10px;
    border-style: solid;
    border-radius: 10px;
    padding: 10px;
    //background-color: darken(lightgray, 10%);
}

.die {
    margin: 0px 5px;

    img {
        width: 50px;
        border-radius: 10px;
    }
}

.player-symbols {
    font-size: 2em;
}

@each $team, $color in $team-colors {
    .#{$team} {
        .player-name {
            //color: $color;
        }

        .player-dice {
            border-color: $color;
        }
    }
}
</style>
