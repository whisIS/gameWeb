export default {
    path: '/game/:gameId',
    name: 'Game',
    component: () => import('../views/game/game.vue')
}