<template>
    <div class="character-slot" :class="{active: character.active}">
        <div class="character-image">
            <img :src="urlAvatar" />
        </div>
        <div class="character-stats">
            <div class="character-stat">AP</div>
            <div class="character-stat-value">{{ character.actionPoints }}</div>
            <div class="character-stat">MP</div>
            <div class="character-stat-value">{{ character.movementPoints }}</div>
            <div class="character-stat"><icon data="@icon/initiative.svg" /></div>
            <div class="character-stat-value">{{ character.initiative }}</div>
            <div class="character-stat"><icon data="@icon/speed.svg" /></div>
            <div class="character-stat-value">{{ character.speed }}</div>
            <div class="character-stat"><icon data="@icon/energy.svg" /></div>
            <div class="character-stat-value">{{ character.energy }}</div>
            <div class="character-stat"><icon data="@icon/health.svg" /></div>
            <div class="character-stat-value">{{ character.health }}</div>
            <div class="character-stat"><icon data="@icon/damage.svg" /></div>
            <div class="character-stat-value">0</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props: {
        character: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    computed: {
        ...mapGetters(["characters"]),
        info() {
            return this.characters[this.character.id]; //.locales[this.user.locale] || {};
        },
        urlAvatar() {
            return `/images/characters/${this.character.id}/avatar.png`;
        },
    },
};
</script>

<style lang="scss">
.character-slot {
    border-width: 3px;
    border-style: solid;
    border-radius: 3px;
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 50px 1fr;
}

@each $team, $color in $team-colors {
    .#{$team} {
        .character-slot {
            border-color: darken($color, 15%);
            background-color: darken($color, 15%);

            &.active {
                border-color: yellow;
            }
        }
    }
}

.character-image {
    img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
    }
}

.character-stats {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(7, 1fr);
    font-size: 0.8em;
    justify-items: center;
    align-items: center;
}

.character-stat {
    grid-row-start: 1;
}

.character-stat-value {
    grid-row-start: 2;
}
</style>
