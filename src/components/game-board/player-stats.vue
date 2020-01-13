<template>
    <div class="player-stats">
        <div class="player-avatar">
            <Gravatar v-if="player.gravatar" :hash="player.gravatar" :size="24" />
            <icon data="@icon/hex.svg" class="team-indicator mr-1 ml-1" />
            <strong>{{ player.name }}</strong>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        player: {
            type: Object,
            default: function() {
                return {
                    name: "Noone",
                };
            },
        },
    },
};
</script>

<style lang="scss">
.player-stats {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 4px;
}

@each $team, $color in $team-colors {
    .#{$team} {
        .player-stats {
            background-color: darken($color, 15%);
        }

        .team-indicator {
            fill: lighten($color, 10%);
        }
    }
}

.player-avatar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.stat {
    display: flex;
    align-items: center;
}
</style>
