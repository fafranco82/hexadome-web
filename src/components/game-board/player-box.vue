<template>
    <div class="player-box" :class="[player.team]">
        <div class="player-stats-wrapper">
            <PlayerStats :player="player" />
        </div>
        <div class="running-order-wrapper">
            <RunningOrder :player="player" />
        </div>
        <div class="character-grid">
            <CharacterSlot :character="character" v-for="character in player.characters" :key="character.uuid" />
        </div>
    </div>
</template>

<script>
import PlayerStats from "@/components/game-board/player-stats";
import RunningOrder from "@/components/game-board/running-order";
import CharacterSlot from "@/components/game-board/character-slot";

export default {
    components: {
        PlayerStats,
        RunningOrder,
        CharacterSlot,
    },
    props: {
        player: {
            type: Object,
            default: function() {
                return {
                    name: "noone",
                    characters: [],
                };
            },
        },
    },
};
</script>

<style lang="scss">
.player-box {
    margin: 5px 0px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    border-width: 3px;
    border-style: solid;
    border-radius: 5px;
    background-color: rgba(black, 0.8);
}

@each $team, $color in $team-colors {
    .#{$team} {
        &.player-box {
            border-color: darken($color, 15%);
        }
    }
}

.player-stats-wrapper {
}

.running-order-wrapper {
    padding: 5px 0;
}

.character-grid {
    flex: 1;
    display: grid;
    grid: repeat(2, 1fr) / repeat(2, 1fr);
    grid-gap: 5px;
    padding: 5px;
}
</style>
