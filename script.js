/* ===================================================================
   YU-GI-OH! HTML EDITION - MASTER GAME ENGINE
   Version: 3.8 MAX
   Author: Qwen 3.8 Max
   Speed Duel Format - Complete Card Game Logic
   =================================================================== */

// ============================================= //
// 1. CONFIGURATION & CONSTANTS                  //
// ============================================= //

const CONFIG = {
    // Game Settings
    STARTING_LP: 4000,
    STARTING_HAND_SIZE: 4,
    DECK_SIZE: 20,
    MAX_HAND_SIZE: 7,
    NORMAL_SUMMON_PER_TURN: 1,
    MAX_MONSTER_ZONES: 3,
    MAX_SPELL_TRAP_ZONES: 3,

    // Animation Durations (ms)
    ANIMATION_SPEED: {
        slow: 1.5,
        normal: 1.0,
        fast: 0.5,
        instant: 0.1
    },

    // AI Settings
    AI_THINK_DELAY: 1500,
    AI_ACTION_DELAY: 800,
    AI_ATTACK_DELAY: 1200,

    // Phases
    PHASES: {
        DRAW: 'draw',
        STANDBY: 'standby',
        MAIN1: 'main1',
        BATTLE: 'battle',
        MAIN2: 'main2',
        END: 'end'
    },

    // Card Types
    CARD_TYPES: {
        MONSTER: 'monster',
        SPELL: 'spell',
        TRAP: 'trap',
        FIELD: 'field'
    },

    // Monster Attributes
    ATTRIBUTES: {
        DARK: 'DARK',
        LIGHT: 'LIGHT',
        EARTH: 'EARTH',
        WATER: 'WATER',
        FIRE: 'FIRE',
        WIND: 'WIND',
        DIVINE: 'DIVINE'
    },

    // Monster Types
    MONSTER_TYPES: {
        WARRIOR: 'Warrior',
        SPELLCASTER: 'Spellcaster',
        DRAGON: 'Dragon',
        BEAST: 'Beast',
        FIEND: 'Fiend',
        MACHINE: 'Machine',
        FAIRY: 'Fairy'
    }
};

// ============================================= //
// 2. CARD DATABASE                              //
// ============================================= //

const CARD_DATABASE = {
    // YUGI'S CARDS (Player)
    'dark-magician': {
        id: 46986414,
        name: 'Dark Magician',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 7,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.SPELLCASTER,
        atk: 2500,
        def: 2100,
        image: 'https://images.ygoprodeck.com/images/cards/46986414.jpg',
        description: 'The ultimate wizard in terms of attack and defense.',
        rarity: 'Ultra Rare'
    },
    'celtic-guardian': {
        id: 91152256,
        name: 'Celtic Guardian',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.EARTH,
        monsterType: CONFIG.MONSTER_TYPES.WARRIOR,
        atk: 1400,
        def: 1200,
        image: 'https://images.ygoprodeck.com/images/cards/91152256.jpg',
        description: 'An elf who learned to wield a sword, he baffles enemies with lightning-swift attacks.',
        rarity: 'Common'
    },
    'mystical-space-typhoon': {
        id: 5318639,
        name: 'Mystical Space Typhoon',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/5318639.jpg',
        description: 'Destroy 1 Spell/Trap Card on the field.',
        rarity: 'Super Rare',
        effect: 'destroy_spell_trap'
    },

    // KAIBA'S CARDS (Opponent AI)
    'blue-eyes-white-dragon': {
        id: 89631139,
        name: 'Blue-Eyes White Dragon',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 8,
        attribute: CONFIG.ATTRIBUTES.LIGHT,
        monsterType: CONFIG.MONSTER_TYPES.DRAGON,
        atk: 3000,
        def: 2500,
        image: 'https://images.ygoprodeck.com/images/cards/89631139.jpg',
        description: 'This legendary dragon is a powerful engine of destruction.',
        rarity: 'Ultra Rare'
    },
    'vorse-raider': {
        id: 14898066,
        name: 'Vorse Raider',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.BEAST,
        atk: 1900,
        def: 1200,
        image: 'https://images.ygoprodeck.com/images/cards/14898066.jpg',
        description: 'A monstrous beast that can tear apart anything in its way.',
        rarity: 'Common'
    },
    'monster-reborn': {
        id: 83764718,
        name: 'Monster Reborn',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/83764718.jpg',
        description: 'Target 1 monster in either GY; Special Summon it.',
        rarity: 'Super Rare',
        effect: 'special_summon_gy'
    },

    // ADDITIONAL CARDS FOR VARIETY
    'kuriboh': {
        id: 40640057,
        name: 'Kuriboh',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 1,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.FIEND,
        atk: 300,
        def: 200,
        image: 'https://images.ygoprodeck.com/images/cards/40640057.jpg',
        description: 'HAND EFFECT: When you take battle damage, you can discard this card; reduce damage to 0.',
        rarity: 'Super Rare'
    },
    'fissure': {
        id: 74845895,
        name: 'Fissure',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/74845895.jpg',
        description: 'Destroy the 1 face-up monster your opponent controls with the lowest ATK.',
        rarity: 'Rare',
        effect: 'destroy_lowest'
    },
    'dark-hole': {
        id: 53129443,
        name: 'Dark Hole',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/53129443.jpg',
        description: 'Destroy all monsters on the field.',
        rarity: 'Super Rare',
        effect: 'destroy_all_monsters'
    },
    'mirror-force': {
        id: 44095762,
        name: 'Mirror Force',
        type: CONFIG.CARD_TYPES.TRAP,
        image: 'https://images.ygoprodeck.com/images/cards/44095762.jpg',
        description: 'When an opponent\'s monster declares an attack: Destroy all ATK Position monsters your opponent controls.',
        rarity: 'Ultra Rare',
        effect: 'destroy_all_attack'
    },
    'summoned-skull': {
        id: 70781052,
        name: 'Summoned Skull',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 6,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.FIEND,
        atk: 2500,
        def: 1200,
        image: 'https://images.ygoprodeck.com/images/cards/70781052.jpg',
        description: 'A fiend with dark powers, especially strong in a fierce battle.',
        rarity: 'Ultra Rare'
    },
    'giant-soldier-of-stone': {
        id: 46009933,
        name: 'Giant Soldier of Stone',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 3,
        attribute: CONFIG.ATTRIBUTES.EARTH,
        monsterType: CONFIG.MONSTER_TYPES.ROCK,
        atk: 1300,
        def: 2000,
        image: 'https://images.ygoprodeck.com/images/cards/46009933.jpg',
        description: 'A solid-bodied warrior of stone.',
        rarity: 'Common'
    },
    'la-jinn-the-mystical-genie': {
        id: 79335209,
        name: 'La Jinn the Mystical Genie of the Lamp',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.FIEND,
        atk: 1800,
        def: 1000,
        image: 'https://images.ygoprodeck.com/images/cards/79335209.jpg',
        description: 'A genie of the lamp that is completely ruthless.',
        rarity: 'Rare'
    },
    'axe-raider': {
        id: 50287060,
        name: 'Axe Raider',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.EARTH,
        monsterType: CONFIG.MONSTER_TYPES.WARRIOR,
        atk: 1700,
        def: 1150,
        image: 'https://images.ygoprodeck.com/images/cards/50287060.jpg',
        description: 'A cruel warrior that attacks with twin axes.',
        rarity: 'Common'
    },
    'mystic-tomato': {
        id: 48309962,
        name: 'Mystic Tomato',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.PLANT,
        atk: 1400,
        def: 1100,
        image: 'https://images.ygoprodeck.com/images/cards/48309962.jpg',
        description: 'When this card is destroyed by battle: Special Summon 1 DARK monster with 1500 or less ATK from your Deck.',
        rarity: 'Common',
        effect: 'search_dark_on_destroy'
    },
    'trap-hole': {
        id: 11819999,
        name: 'Trap Hole',
        type: CONFIG.CARD_TYPES.TRAP,
        image: 'https://images.ygoprodeck.com/images/cards/11819999.jpg',
        description: 'When your opponent Normal or Flip Summons a monster with 1000 or more ATK: Destroy that monster.',
        rarity: 'Common',
        effect: 'destroy_summoned'
    },
    'ookazi': {
        id: 70046172,
        name: 'Ookazi',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/70046172.jpg',
        description: 'Inflict 800 damage to your opponent.',
        rarity: 'Common',
        effect: 'burn_800'
    },
    'red-medicine': {
        id: 95098230,
        name: 'Red Medicine',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/95098230.jpg',
        description: 'Target 1 monster; gain 1000 LP.',
        rarity: 'Common',
        effect: 'heal_1000'
    },
    'necks': {
        id: 48497555,
        name: 'Necks',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/48497555.jpg',
        description: 'Increase the ATK of 1 monster by 300 until the end of this turn.',
        rarity: 'Common',
        effect: 'boost_atk_300'
    }
};

// ============================================= //
// 3. DECK DEFINITIONS                           //
// ============================================= //

const PLAYER_DECK = [
    'dark-magician', 'dark-magician',
    'celtic-guardian', 'celtic-guardian', 'celtic-guardian',
    'summoned-skull', 'summoned-skull',
    'giant-soldier-of-stone', 'giant-soldier-of-stone',
    'la-jinn-the-mystical-genie', 'la-jinn-the-mystical-genie',
    'axe-raider', 'axe-raider',
    'kuriboh', 'kuriboh',
    'mystical-space-typhoon', 'mystical-space-typhoon',
    'dark-hole', 'dark-hole',
    'fissure', 'fissure'
];

const OPPONENT_DECK = [
    'blue-eyes-white-dragon', 'blue-eyes-white-dragon',
    'vorse-raider', 'vorse-raider', 'vorse-raider',
    'vorse-raider',
    'axe-raider', 'axe-raider', 'axe-raider',
    'giant-soldier-of-stone', 'giant-soldier-of-stone',
    'la-jinn-the-mystical-genie', 'la-jinn-the-mystical-genie',
    'monster-reborn', 'monster-reborn',
    'mystical-space-typhoon', 'mystical-space-typhoon',
    'dark-hole', 'dark-hole',
    'ookazi', 'ookazi'
];

// ============================================= //
// 4. GAME STATE OBJECT                          //
// ============================================= //

class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        // Turn & Phase
        this.turnNumber = 1;
        this.currentPhase = CONFIG.PHASES.STANDBY;
        this.turnOwner = 'player'; // 'player' or 'opponent'

        // Life Points
        this.playerLP = CONFIG.STARTING_LP;
        this.opponentLP = CONFIG.STARTING_LP;

        // Hands
        this.playerHand = [];
        this.opponentHand = [];

        // Decks (will be shuffled)
        this.playerDeck = [];
        this.opponentDeck = [];

        // Graveyards
        this.playerGraveyard = [];
        this.opponentGraveyard = [];

        // Extra Decks (placeholder)
        this.playerExtra = [];
        this.opponentExtra = [];

        // Field Zones
        this.playerMonsters = [null, null, null]; // Index 0, 1, 2
        this.opponentMonsters = [null, null, null];

        this.playerSpellsTraps = [null, null, null];
        this.opponentSpellsTraps = [null, null, null];

        this.playerFieldSpell = null;
        this.opponentFieldSpell = null;

        // Turn Flags
        this.normalSummonUsed = false;
        this.hasDrawnThisTurn = false;
        this.attackedThisTurn = new Set(); // Set of card uniqueIds that have attacked
        this.battlePhaseEntered = false;

        // Game State
        this.gameState = 'loading'; // loading, menu, playing, ended
        this.winner = null; // 'player', 'opponent', null

        // Interaction State
        this.selectedCard = null;
        this.selectedZone = null;
        this.targetingMode = false;
        this.targetingCallback = null;
        this.contextMenuTarget = null;

        // Counters
        this.playerDeckCount = CONFIG.DECK_SIZE;
        this.opponentDeckCount = CONFIG.DECK_SIZE;
        this.playerGYCount = 0;
        this.opponentGYCount = 0;

        // Stats
        this.damageDealt = { player: 0, opponent: 0 };
        this.cardsPlayed = { player: 0, opponent: 0 };

        // Unique ID Counter
        this.nextCardId = 1;
    }
}

// ============================================= //
// 5. UTILITY FUNCTIONS                          //
// ============================================= //

const Utils = {
    // Generate unique card ID
    generateUniqueId() {
        return `card_${gameState.nextCardId++}_${Date.now()}`;
    },

    // Shuffle array (Fisher-Yates)
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Delay function for async animations
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Get animation speed multiplier
    getAnimationSpeed() {
        const setting = localStorage.getItem('animationSpeed') || 'normal';
        return CONFIG.ANIMATION_SPEED[setting] || 1.0;
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Get card data from database
    getCardData(cardId) {
        return CARD_DATABASE[cardId] || null;
    },

    // Create card instance with unique ID
    createCardInstance(cardId) {
        const cardData = this.getCardData(cardId);
        if (!cardData) return null;

        return {
            ...cardData,
            uniqueId: this.generateUniqueId(),
            cardId: cardId,
            position: 'attack', // 'attack' or 'defense'
            faceUp: true,
            hasAttacked: false,
            summonedThisTurn: true,
            owner: null, // 'player' or 'opponent'
            zoneIndex: -1,
            zoneType: null // 'monster', 'spelltrap', 'field'
        };
    },

    // Calculate battle damage
    calculateBattleDamage(attacker, defender, defenderPosition) {
        const atkValue = attacker.atk || 0;

        if (defenderPosition === 'attack') {
            const defAtkValue = defender.atk || 0;
            if (atkValue > defAtkValue) {
                return {
                    damage: atkValue - defAtkValue,
                    defenderDestroyed: true,
                    attackerDestroyed: false
                };
            } else if (atkValue < defAtkValue) {
                return {
                    damage: defAtkValue - atkValue,
                    defenderDestroyed: false,
                    attackerDestroyed: true
                };
            } else {
                return {
                    damage: 0,
                    defenderDestroyed: true,
                    attackerDestroyed: true
                };
            }
        } else {
            // Defense position
            const defValue = defender.def || 0;
            if (atkValue > defValue) {
                return {
                    damage: 0, // No damage when attacking DEF
                    defenderDestroyed: true,
                    attackerDestroyed: false
                };
            } else if (atkValue < defValue) {
                return {
                    damage: defValue - atkValue, // Pierce damage to attacker
                    defenderDestroyed: false,
                    attackerDestroyed: false
                };
            } else {
                return {
                    damage: 0,
                    defenderDestroyed: false,
                    attackerDestroyed: false
                };
            }
        }
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    // Get element position for animations
    getElementCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    },

    // Log message to battle log
    logMessage(message, type = 'system') {
        const logContent = document.getElementById('log-content');
        if (!logContent) return;

        const now = new Date();
        const time = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${message}</span>
        `;

        logContent.insertBefore(entry, logContent.firstChild);

        // Keep only last 50 entries
        while (logContent.children.length > 50) {
            logContent.removeChild(logContent.lastChild);
        }
    },

    // Show toast notification
    showToast(title, message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Play sound effect
    playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound && localStorage.getItem('sfxEnabled') !== 'false') {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Ignore autoplay errors
        }
    },

    // Check if it's player's turn
    isPlayerTurn() {
        return gameState.turnOwner === 'player';
    },

    // Check if it's opponent's turn
    isOpponentTurn() {
        return gameState.turnOwner === 'opponent';
    }
};

// ============================================= //
// 6. DOM MANAGER                                //
// ============================================= //

const DOMManager = {
    // Cache DOM elements
    elements: {},

    init() {
        this.elements = {
            // Screens
            loadingScreen: document.getElementById('loading-screen'),
            mainMenu: document.getElementById('main-menu'),
            gameContainer: document.getElementById('game-container'),
            resultOverlay: document.getElementById('result-overlay'),

            // Loading
            loadingProgress: document.getElementById('loading-progress'),
            loadingText: document.getElementById('loading-text'),
            loadingPercent: document.getElementById('loading-percent'),

            // Menu
            btnStartDuel: document.getElementById('btn-start-duel'),
            btnDeckBuilder: document.getElementById('btn-deck-builder'),
            btnTutorial: document.getElementById('btn-tutorial'),
            btnSettings: document.getElementById('btn-settings'),

            // HUD
            playerLPDisplay: document.getElementById('player-lp-display'),
            opponentLPDisplay: document.getElementById('opponent-lp-display'),
            playerLPBar: document.getElementById('player-lp-bar'),
            opponentLPBar: document.getElementById('opponent-lp-bar'),
            playerDeckCount: document.getElementById('player-deck-count'),
            opponentDeckCount: document.getElementById('opponent-deck-count'),
            playerGYCount: document.getElementById('player-gy-count'),
            opponentGYCount: document.getElementById('opponent-gy-count'),

            // Hands
            playerHandCards: document.getElementById('player-hand-cards'),
            opponentHandCards: document.getElementById('opponent-hand-cards'),

            // Field
            arena: document.getElementById('arena'),

            // Phase
            currentPhaseName: document.getElementById('current-phase-name'),
            turnCounter: document.getElementById('turn-counter'),
            turnOwner: document.getElementById('turn-owner'),

            // Action Buttons
            btnNextPhase: document.getElementById('btn-next-phase'),
            btnEndTurn: document.getElementById('btn-end-turn'),
            btnCancel: document.getElementById('btn-cancel'),
            btnAutoDuel: document.getElementById('btn-auto-duel'),
            btnSurrender: document.getElementById('btn-surrender'),

            // Card Inspector
            cardInspector: document.getElementById('card-inspector'),
            inspectorArt: document.getElementById('inspector-art'),
            inspectorName: document.getElementById('inspector-name'),
            inspectorType: document.getElementById('inspector-type'),
            inspectorAttribute: document.getElementById('inspector-attribute'),
            inspectorLevel: document.getElementById('inspector-level'),
            inspectorDescription: document.getElementById('inspector-description'),
            inspectorAtk: document.getElementById('inspector-atk'),
            inspectorDef: document.getElementById('inspector-def'),
            inspectorId: document.getElementById('inspector-id'),
            inspectorCategory: document.getElementById('inspector-category'),
            inspectorClose: document.getElementById('inspector-close'),

            // Context Menu
            contextMenu: document.getElementById('context-menu'),

            // Effects
            battleEffectsContainer: document.getElementById('battle-effects-container'),
            particleEffectsContainer: document.getElementById('particle-effects-container'),
            summonEffectsContainer: document.getElementById('summon-effects-container'),
            battleMessages: document.getElementById('battle-messages'),
            damageFloaters: document.getElementById('damage-floaters'),
            attackSvg: document.getElementById('attack-svg'),
            attackLine: document.getElementById('attack-line'),

            // Modals
            graveyardModal: document.getElementById('graveyard-modal'),
            graveyardGrid: document.getElementById('graveyard-grid'),
            graveyardClose: document.getElementById('graveyard-close'),
            graveyardOwnerLabel: document.getElementById('graveyard-owner-label'),

            deckModal: document.getElementById('deck-modal'),
            deckGrid: document.getElementById('deck-grid'),
            deckClose: document.getElementById('deck-close'),

            dialogModal: document.getElementById('dialog-modal'),
            dialogTitle: document.getElementById('dialog-title'),
            dialogMessage: document.getElementById('dialog-message'),
            dialogConfirm: document.getElementById('dialog-confirm'),
            dialogCancel: document.getElementById('dialog-cancel'),

            settingsModal: document.getElementById('settings-modal'),
            settingsClose: document.getElementById('settings-close'),

            tutorialOverlay: document.getElementById('tutorial-overlay'),

            // Battle Log
            logToggle: document.getElementById('log-toggle'),
            logContent: document.getElementById('log-content'),

            // Toast
            toastContainer: document.getElementById('toast-container'),

            // Phase Transition
            phaseTransition: document.getElementById('phase-transition'),
            phaseTransitionText: document.getElementById('phase-transition-text'),

            // Cursor
            cursorFollower: document.getElementById('cursor-follower'),
            cursorFollowerInner: document.getElementById('cursor-follower-inner'),

            // Debug
            debugPanel: document.getElementById('debug-panel'),
            debugClose: document.getElementById('debug-close'),
            debugLog: document.getElementById('debug-log'),

            // Shortcuts
            shortcutsTooltip: document.getElementById('shortcuts-tooltip')
        };
    },

    // Update LP display with rolling animation
    updateLPDisplay(owner, newValue) {
        const displayId = owner === 'player' ? 'playerLPDisplay' : 'opponentLPDisplay';
        const barId = owner === 'player' ? 'playerLPBar' : 'opponentLPBar';
        const display = this.elements[displayId];
        const bar = this.elements[barId];

        if (!display || !bar) return;

        const digits = display.querySelectorAll('.digit');
        const valueStr = String(newValue).padStart(4, '0');

        digits.forEach((digit, index) => {
            const newChar = valueStr[index];
            if (digit.textContent !== newChar) {
                digit.classList.add('rolling');
                setTimeout(() => {
                    digit.textContent = newChar;
                    digit.classList.remove('rolling');
                }, 250);
            }
        });

        // Update LP bar
        const percentage = (newValue / CONFIG.STARTING_LP) * 100;
        bar.style.width = `${percentage}%`;

        // Change bar color based on LP percentage
        if (percentage <= 25) {
            bar.style.background = 'linear-gradient(90deg, #ff003c 0%, #ff4444 100%)';
        } else if (percentage <= 50) {
            bar.style.background = 'linear-gradient(90deg, #ffd700 0%, #ffaa00 100%)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)';
        }
    },

    // Update deck counters
    updateDeckCounters() {
        this.elements.playerDeckCount.textContent = gameState.playerDeckCount;
        this.elements.opponentDeckCount.textContent = gameState.opponentDeckCount;
        this.elements.playerGYCount.textContent = gameState.playerGYCount;
        this.elements.opponentGYCount.textContent = gameState.opponentGYCount;
    },

    // Update phase display
    updatePhaseDisplay() {
        const phaseNames = {
            [CONFIG.PHASES.DRAW]: 'DRAW PHASE',
            [CONFIG.PHASES.STANDBY]: 'STANDBY PHASE',
            [CONFIG.PHASES.MAIN1]: 'MAIN PHASE 1',
            [CONFIG.PHASES.BATTLE]: 'BATTLE PHASE',
            [CONFIG.PHASES.MAIN2]: 'MAIN PHASE 2',
            [CONFIG.PHASES.END]: 'END PHASE'
        };

        this.elements.currentPhaseName.textContent = phaseNames[gameState.currentPhase] || 'MAIN PHASE';
        this.elements.turnCounter.textContent = gameState.turnNumber;
        this.elements.turnOwner.textContent = gameState.turnOwner === 'player' ? 'YOUR TURN' : "OPPONENT'S TURN";

        // Update phase track visual
        document.querySelectorAll('.phase-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });

        const phaseOrder = ['draw', 'standby', 'main1', 'battle', 'main2', 'end'];
        const currentIndex = phaseOrder.indexOf(gameState.currentPhase);

        phaseOrder.forEach((phase, index) => {
            const stepEl = document.querySelector(`.phase-step[data-phase="${phase}"]`);
            if (stepEl) {
                if (index < currentIndex) stepEl.classList.add('completed');
                if (index === currentIndex) stepEl.classList.add('active');
            }
        });
    },

    // Create card DOM element
    createCardElement(cardInstance, options = {}) {
        const { faceDown = false, inHand = false, onField = false } = options;

        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.uniqueId = cardInstance.uniqueId;
        cardEl.dataset.cardId = cardInstance.cardId;

        if (inHand) cardEl.classList.add('card-in-hand');
        if (onField) cardEl.classList.add('card-on-field');
        if (faceDown) cardEl.classList.add('card-face-down');

        cardEl.innerHTML = `
            <div class="card-face card-front">
                <img class="card-image" src="${cardInstance.image}" alt="${cardInstance.name}" loading="lazy">
            </div>
            <div class="card-face card-back">
                <img class="card-image" src="https://images.ygoprodeck.com/images/cards/back_high.jpg" alt="Card Back" loading="lazy">
            </div>
        `;

        // Add position indicator for monsters on field
        if (onField && cardInstance.type === CONFIG.CARD_TYPES.MONSTER && cardInstance.faceUp) {
            if (cardInstance.position === 'attack') {
                cardEl.classList.add('card-position-attack');
                const atkIndicator = document.createElement('div');
                atkIndicator.className = 'card-atk-indicator';
                atkIndicator.textContent = `ATK/${cardInstance.atk}`;
                cardEl.appendChild(atkIndicator);
            } else {
                cardEl.classList.add('card-position-defense');
                const defIndicator = document.createElement('div');
                defIndicator.className = 'card-def-indicator';
                defIndicator.textContent = `DEF/${cardInstance.def}`;
                cardEl.appendChild(defIndicator);
            }
        }

        return cardEl;
    },

    // Render player hand
    renderPlayerHand() {
        const container = this.elements.playerHandCards;
        container.innerHTML = '';

        gameState.playerHand.forEach((cardInstance, index) => {
            const cardEl = this.createCardElement(cardInstance, { inHand: true });
            cardEl.style.zIndex = index + 1;

            // Add event listeners
            cardEl.addEventListener('click', () => PlayerActions.onHandCardClick(cardInstance, cardEl));
            cardEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                PlayerActions.onHandCardRightClick(cardInstance, cardEl, e);
            });
            cardEl.addEventListener('mouseenter', () => CardInspector.show(cardInstance));
            cardEl.addEventListener('mouseleave', () => CardInspector.hide());

            container.appendChild(cardEl);
        });
    },

    // Render opponent hand (face down)
    renderOpponentHand() {
        const container = this.elements.opponentHandCards;
        container.innerHTML = '';

        gameState.opponentHand.forEach((cardInstance, index) => {
            const cardEl = this.createCardElement(cardInstance, { inHand: true, faceDown: true });
            cardEl.style.zIndex = index + 1;
            container.appendChild(cardEl);
        });
    },

    // Render monster on field
    renderMonsterOnField(owner, zoneIndex, cardInstance) {
        const zoneId = owner === 'player' ? `player-monster-${zoneIndex}` : `opponent-monster-${zoneIndex}`;
        const zoneEl = document.getElementById(zoneId);

        if (!zoneEl) return;

        // Clear placeholder
        zoneEl.innerHTML = '';

        if (cardInstance) {
            const faceDown = !cardInstance.faceUp;
            const cardEl = this.createCardElement(cardInstance, { onField: true, faceDown });

            if (cardInstance.position === 'defense') {
                cardEl.classList.add('card-position-defense');
            }

            // Add event listeners for player's monsters
            if (owner === 'player') {
                cardEl.addEventListener('click', () => PlayerActions.onFieldMonsterClick(cardInstance, cardEl));
                cardEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    PlayerActions.onFieldMonsterRightClick(cardInstance, cardEl, e);
                });
                cardEl.addEventListener('mouseenter', () => {
                    if (cardInstance.faceUp) CardInspector.show(cardInstance);
                });
                cardEl.addEventListener('mouseleave', () => CardInspector.hide());
            }

            zoneEl.appendChild(cardEl);
            zoneEl.classList.add('occupied');
        } else {
            // Show placeholder
            zoneEl.innerHTML = `
                <div class="zone-placeholder">
                    <div class="zone-icon">👾</div>
                    <div class="zone-label">MONSTER</div>
                </div>
            `;
            zoneEl.classList.remove('occupied');
        }
    },

    // Render spell/trap on field
    renderSpellTrapOnField(owner, zoneIndex, cardInstance) {
        const zoneId = owner === 'player' ? `player-st-${zoneIndex}` : `opponent-st-${zoneIndex}`;
        const zoneEl = document.getElementById(zoneId);

        if (!zoneEl) return;

        zoneEl.innerHTML = '';

        if (cardInstance) {
            const faceDown = !cardInstance.faceUp;
            const cardEl = this.createCardElement(cardInstance, { onField: true, faceDown });

            if (owner === 'player' && cardInstance.faceUp) {
                cardEl.addEventListener('click', () => PlayerActions.onFieldSpellTrapClick(cardInstance, cardEl));
                cardEl.addEventListener('mouseenter', () => CardInspector.show(cardInstance));
                cardEl.addEventListener('mouseleave', () => CardInspector.hide());
            }

            zoneEl.appendChild(cardEl);
            zoneEl.classList.add('occupied');
        } else {
            zoneEl.innerHTML = `
                <div class="zone-placeholder">
                    <div class="zone-icon">🪄</div>
                    <div class="zone-label">S/T</div>
                </div>
            `;
            zoneEl.classList.remove('occupied');
        }
    },

    // Render entire field
    renderField() {
        // Player monsters
        gameState.playerMonsters.forEach((card, index) => {
            this.renderMonsterOnField('player', index, card);
        });

        // Opponent monsters
        gameState.opponentMonsters.forEach((card, index) => {
            this.renderMonsterOnField('opponent', index, card);
        });

        // Player S/T
        gameState.playerSpellsTraps.forEach((card, index) => {
            this.renderSpellTrapOnField('player', index, card);
        });

        // Opponent S/T
        gameState.opponentSpellsTraps.forEach((card, index) => {
            this.renderSpellTrapOnField('opponent', index, card);
        });
    },

    // Show phase transition overlay
    async showPhaseTransition(phaseName) {
        const overlay = this.elements.phaseTransition;
        const text = this.elements.phaseTransitionText;

        text.textContent = phaseName;
        overlay.classList.remove('hidden');

        await Utils.delay(1000);

        overlay.classList.add('hidden');
    },

    // Show battle message
    showBattleMessage(text, type = 'summon') {
        const container = this.elements.battleMessages;
        const msg = document.createElement('div');
        msg.className = `battle-message ${type}`;
        msg.textContent = text;
        container.appendChild(msg);

        setTimeout(() => msg.remove(), 2000);
    },

    // Show damage floater
    showDamageFloater(targetElement, amount) {
        if (!targetElement) return;

        const rect = targetElement.getBoundingClientRect();
        const container = this.elements.damageFloaters;

        const floater = document.createElement('div');
        floater.className = 'damage-floater';
        floater.textContent = `-${amount}`;
        floater.style.left = `${rect.left + rect.width / 2}px`;
        floater.style.top = `${rect.top}px`;

        container.appendChild(floater);

        setTimeout(() => floater.remove(), 1500);
    },

    // Screen shake effect
    screenShake(intensity = 'light') {
        const gameContainer = this.elements.gameContainer;
        gameContainer.classList.add(`shake-${intensity}`);
        setTimeout(() => {
            gameContainer.classList.remove(`shake-${intensity}`);
        }, 700);
    },

    // Impact flash
    impactFlash() {
        const flash = document.createElement('div');
        flash.className = 'impact-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
    },

    // Show graveyard modal
    showGraveyard(owner) {
        const modal = this.elements.graveyardModal;
        const grid = this.elements.graveyardGrid;
        const label = this.elements.graveyardOwnerLabel;

        const graveyard = owner === 'player' ? gameState.playerGraveyard : gameState.opponentGraveyard;
        label.textContent = owner === 'player' ? 'YOUR GRAVEYARD' : "OPPONENT'S GRAVEYARD";

        grid.innerHTML = '';

        graveyard.forEach(cardInstance => {
            const cardEl = this.createCardElement(cardInstance, {});
            cardEl.addEventListener('mouseenter', () => CardInspector.show(cardInstance));
            cardEl.addEventListener('mouseleave', () => CardInspector.hide());
            grid.appendChild(cardEl);
        });

        modal.classList.add('active');
    },

    // Hide graveyard modal
    hideGraveyard() {
        this.elements.graveyardModal.classList.remove('active');
    },

    // Show dialog
    showDialog(title, message) {
        return new Promise((resolve) => {
            this.elements.dialogTitle.textContent = title;
            this.elements.dialogMessage.textContent = message;
            this.elements.dialogModal.classList.add('active');

            const confirmHandler = () => {
                cleanup();
                resolve(true);
            };

            const cancelHandler = () => {
                cleanup();
                resolve(false);
            };

            const cleanup = () => {
                this.elements.dialogModal.classList.remove('active');
                this.elements.dialogConfirm.removeEventListener('click', confirmHandler);
                this.elements.dialogCancel.removeEventListener('click', cancelHandler);
            };

            this.elements.dialogConfirm.addEventListener('click', confirmHandler);
            this.elements.dialogCancel.addEventListener('click', cancelHandler);
        });
    },

    // Enable/Disable action buttons based on phase
    updateActionButtons() {
        const isPlayerTurn = Utils.isPlayerTurn();
        const phase = gameState.currentPhase;

        this.elements.btnNextPhase.disabled = !isPlayerTurn;
        this.elements.btnEndTurn.disabled = !isPlayerTurn;
        this.elements.btnSurrender.disabled = false;

        // Hide/show based on phase
        if (phase === CONFIG.PHASES.BATTLE) {
            this.elements.btnNextPhase.textContent = '⏭️ END BATTLE';
        } else if (phase === CONFIG.PHASES.END) {
            this.elements.btnNextPhase.textContent = '➡️ NEXT TURN';
        } else {
            this.elements.btnNextPhase.textContent = '➡️ NEXT PHASE';
        }
    }
};

// ============================================= //
// 7. CARD INSPECTOR                             //
// ============================================= //

const CardInspector = {
    isVisible: false,

    show(cardInstance) {
        const inspector = DOMManager.elements.cardInspector;
        if (!inspector || !cardInstance) return;

        DOMManager.elements.inspectorArt.src = cardInstance.image;
        DOMManager.elements.inspectorName.textContent = cardInstance.name;

        // Type
        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            DOMManager.elements.inspectorType.textContent = cardInstance.monsterType || 'Monster';
            DOMManager.elements.inspectorType.style.display = '';
            DOMManager.elements.inspectorAttribute.textContent = cardInstance.attribute || '-';
            DOMManager.elements.inspectorAttribute.style.display = '';
            DOMManager.elements.inspectorLevel.textContent = `★${cardInstance.level}`;
            DOMManager.elements.inspectorLevel.style.display = '';
        } else {
            DOMManager.elements.inspectorType.textContent = cardInstance.type.toUpperCase();
            DOMManager.elements.inspectorType.style.display = '';
            DOMManager.elements.inspectorAttribute.style.display = 'none';
            DOMManager.elements.inspectorLevel.style.display = 'none';
        }

        // Description
        DOMManager.elements.inspectorDescription.textContent = cardInstance.description || 'No description available.';

        // Stats
        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            DOMManager.elements.inspectorAtk.textContent = cardInstance.atk;
            DOMManager.elements.inspectorDef.textContent = cardInstance.def;
            DOMManager.elements.inspectorStats.style.display = '';
        } else {
            DOMManager.elements.inspectorAtk.textContent = '/';
            DOMManager.elements.inspectorDef.textContent = '/';
        }

        // Meta
        DOMManager.elements.inspectorId.textContent = cardInstance.id || '-';
        DOMManager.elements.inspectorCategory.textContent = cardInstance.type ? cardInstance.type.toUpperCase() : '-';

        inspector.classList.remove('hidden');
        this.isVisible = true;
    },

    hide() {
        const inspector = DOMManager.elements.cardInspector;
        if (inspector) {
            inspector.classList.add('hidden');
            this.isVisible = false;
        }
    }
};

// ============================================= //
// 8. PLAYER ACTIONS                             //
// ============================================= //

const PlayerActions = {
    // Click card in hand
    onHandCardClick(cardInstance, cardEl) {
        if (!Utils.isPlayerTurn()) return;
        if (gameState.currentPhase !== CONFIG.PHASES.MAIN1 && gameState.currentPhase !== CONFIG.PHASES.MAIN2) {
            Utils.showToast('Cannot Play', 'You can only play cards during Main Phase.', 'error');
            return;
        }

        // Check if it's a monster card
        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            if (gameState.normalSummonUsed) {
                Utils.showToast('Already Summoned', 'You can only Normal Summon/Set once per turn.', 'error');
                return;
            }
            // Find empty monster zone
            const emptyZone = gameState.playerMonsters.findIndex(zone => zone === null);
            if (emptyZone === -1) {
                Utils.showToast('Zones Full', 'All monster zones are occupied.', 'error');
                return;
            }
            // Auto summon in attack for now (right click for set)
            this.summonMonster(cardInstance, emptyZone, 'attack');
        }
        // Spell card
        else if (cardInstance.type === CONFIG.CARD_TYPES.SPELL) {
            this.activateSpell(cardInstance);
        }
        // Trap card - must be set first
        else if (cardInstance.type === CONFIG.CARD_TYPES.TRAP) {
            const emptyZone = gameState.playerSpellsTraps.findIndex(zone => zone === null);
            if (emptyZone === -1) {
                Utils.showToast('Zones Full', 'All Spell/Trap zones are occupied.', 'error');
                return;
            }
            this.setSpellTrap(cardInstance, emptyZone);
        }
    },

    // Right click card in hand (context menu)
    onHandCardRightClick(cardInstance, cardEl, event) {
        if (!Utils.isPlayerTurn()) return;
        if (gameState.currentPhase !== CONFIG.PHASES.MAIN1 && gameState.currentPhase !== CONFIG.PHASES.MAIN2) return;

        gameState.contextMenuTarget = { cardInstance, cardEl };

        const menu = DOMManager.elements.contextMenu;
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.classList.remove('hidden');

        // Show/hide relevant options
        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.style.display = 'none';
        });

        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            document.querySelector('[data-action="summon-atk"]').style.display = '';
            document.querySelector('[data-action="summon-def"]').style.display = '';
        } else if (cardInstance.type === CONFIG.CARD_TYPES.SPELL) {
            document.querySelector('[data-action="activate"]').style.display = '';
            document.querySelector('[data-action="set-spell"]').style.display = '';
        } else if (cardInstance.type === CONFIG.CARD_TYPES.TRAP) {
            document.querySelector('[data-action="set-spell"]').style.display = '';
        }
        document.querySelector('[data-action="cancel"]').style.display = '';
    },

    // Summon monster to field
    async summonMonster(cardInstance, zoneIndex, position) {
        // Remove from hand
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        // Set up card instance
        cardInstance.owner = 'player';
        cardInstance.zoneIndex = zoneIndex;
        cardInstance.zoneType = 'monster';
        cardInstance.position = position;
        cardInstance.faceUp = true;
        cardInstance.summonedThisTurn = true;
        cardInstance.hasAttacked = false;

        gameState.playerMonsters[zoneIndex] = cardInstance;
        gameState.normalSummonUsed = true;
        gameState.cardsPlayed.player++;

        // Render
        DOMManager.renderPlayerHand();
        DOMManager.renderMonsterOnField('player', zoneIndex, cardInstance);

        // Animation
        const zoneEl = document.getElementById(`player-monster-${zoneIndex}`);
        if (zoneEl) {
            const summonEffect = document.createElement('div');
            summonEffect.className = 'summon-effect';
            zoneEl.appendChild(summonEffect);
            setTimeout(() => summonEffect.remove(), 1000);
        }

        DOMManager.showBattleMessage('SUMMON!', 'summon');
        Utils.playSound('sfx-summon');
        Utils.logMessage(`Yami Yugi summons ${cardInstance.name} in ${position.toUpperCase()} position!`, 'player');

        await Utils.delay(800);
    },

    // Set monster face-down in defense
    async setMonster(cardInstance, zoneIndex) {
        // Remove from hand
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        cardInstance.owner = 'player';
        cardInstance.zoneIndex = zoneIndex;
        cardInstance.zoneType = 'monster';
        cardInstance.position = 'defense';
        cardInstance.faceUp = false;
        cardInstance.summonedThisTurn = true;
        cardInstance.hasAttacked = false;

        gameState.playerMonsters[zoneIndex] = cardInstance;
        gameState.normalSummonUsed = true;
        gameState.cardsPlayed.player++;

        DOMManager.renderPlayerHand();
        DOMManager.renderMonsterOnField('player', zoneIndex, cardInstance);

        DOMManager.showBattleMessage('SET!', 'summon');
        Utils.logMessage(`Yami Yugi sets a monster in face-down defense position.`, 'player');

        await Utils.delay(600);
    },

    // Set spell/trap face-down
    async setSpellTrap(cardInstance, zoneIndex) {
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        cardInstance.owner = 'player';
        cardInstance.zoneIndex = zoneIndex;
        cardInstance.zoneType = 'spelltrap';
        cardInstance.faceUp = false;

        gameState.playerSpellsTraps[zoneIndex] = cardInstance;
        gameState.cardsPlayed.player++;

        DOMManager.renderPlayerHand();
        DOMManager.renderSpellTrapOnField('player', zoneIndex, cardInstance);

        Utils.logMessage(`Yami Yugi sets a card in the Spell/Trap zone.`, 'player');

        await Utils.delay(500);
    },

    // Activate spell card
    async activateSpell(cardInstance) {
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        // Animate spell activation
        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Yami Yugi activates ${cardInstance.name}!`, 'player');

        // Apply spell effect
        await this.resolveSpellEffect(cardInstance, 'player');

        // Send to graveyard
        gameState.playerGraveyard.push(cardInstance);
        gameState.playerGYCount++;
        DOMManager.updateDeckCounters();

        DOMManager.renderPlayerHand();

        await Utils.delay(800);
    },

    // Resolve spell effect
    async resolveSpellEffect(cardInstance, owner) {
        const effect = cardInstance.effect;
        const opponent = owner === 'player' ? 'opponent' : 'player';

        switch (effect) {
            case 'destroy_spell_trap':
                // Destroy 1 random spell/trap on opponent's field
                const opponentST = owner === 'player' ? gameState.opponentSpellsTraps : gameState.playerSpellsTraps;
                const occupiedST = opponentST.map((c, i) => c ? i : -1).filter(i => i !== -1);

                if (occupiedST.length > 0) {
                    const targetIndex = occupiedST[Utils.randomInt(0, occupiedST.length - 1)];
                    const targetCard = opponentST[targetIndex];

                    if (targetCard) {
                        opponentST[targetIndex] = null;
                        const gy = owner === 'player' ? gameState.opponentGraveyard : gameState.playerGraveyard;
                        gy.push(targetCard);

                        if (opponent === 'opponent') gameState.opponentGYCount++;
                        else gameState.playerGYCount++;

                        Utils.logMessage(`${cardInstance.name} destroys ${targetCard.name}!`, 'damage');
                        DOMManager.renderField();
                        DOMManager.updateDeckCounters();
                    }
                } else {
                    Utils.logMessage(`No Spell/Trap cards to destroy.`, 'system');
                }
                break;

            case 'destroy_all_monsters':
                // Dark Hole - destroy all monsters
                const destroyAll = (zones, gy) => {
                    zones.forEach((card, i) => {
                        if (card) {
                            gy.push(card);
                            zones[i] = null;
                        }
                    });
                };

                destroyAll(gameState.playerMonsters, gameState.playerGraveyard);
                destroyAll(gameState.opponentMonsters, gameState.opponentGraveyard);

                gameState.playerGYCount = gameState.playerGraveyard.length;
                gameState.opponentGYCount = gameState.opponentGraveyard.length;

                DOMManager.screenShake('heavy');
                DOMManager.impactFlash();
                Utils.logMessage(`Dark Hole destroys all monsters on the field!`, 'damage');
                DOMManager.renderField();
                DOMManager.updateDeckCounters();
                break;

            case 'destroy_lowest':
                // Fissure - destroy opponent's lowest ATK monster
                const opponentMonsters = owner === 'player' ? gameState.opponentMonsters : gameState.playerMonsters;
                const gy = owner === 'player' ? gameState.opponentGraveyard : gameState.playerGraveyard;

                let lowestIndex = -1;
                let lowestAtk = Infinity;

                opponentMonsters.forEach((card, i) => {
                    if (card && card.faceUp && card.atk < lowestAtk) {
                        lowestAtk = card.atk;
                        lowestIndex = i;
                    }
                });

                if (lowestIndex !== -1) {
                    const destroyed = opponentMonsters[lowestIndex];
                    opponentMonsters[lowestIndex] = null;
                    gy.push(destroyed);

                    if (owner === 'player') gameState.opponentGYCount++;
                    else gameState.playerGYCount++;

                    Utils.logMessage(`${cardInstance.name} destroys ${destroyed.name}!`, 'damage');
                    DOMManager.screenShake('medium');
                }
                DOMManager.renderField();
                DOMManager.updateDeckCounters();
                break;

            case 'burn_800':
                // Ookazi - inflict 800 damage
                await GameController.dealDamage(opponent, 800);
                break;

            case 'heal_1000':
                // Red Medicine - heal 1000
                await GameController.healLP(owner, 1000);
                break;

            case 'special_summon_gy':
                // Monster Reborn - special summon from GY
                const sourceGY = owner === 'player' ? gameState.playerGraveyard : gameState.opponentGraveyard;
                const targetMonsters = owner === 'player' ? gameState.playerMonsters : gameState.opponentMonsters;
                const emptyZone = targetMonsters.findIndex(z => z === null);

                const monsterInGY = sourceGY.find(c => c.type === CONFIG.CARD_TYPES.MONSTER);
                if (monsterInGY && emptyZone !== -1) {
                    sourceGY.splice(sourceGY.indexOf(monsterInGY), 1);

                    monsterInGY.faceUp = true;
                    monsterInGY.position = 'attack';
                    monsterInGY.summonedThisTurn = false;
                    monsterInGY.hasAttacked = false;
                    monsterInGY.zoneIndex = emptyZone;

                    targetMonsters[emptyZone] = monsterInGY;

                    DOMManager.showBattleMessage('REBORN!', 'summon');
                    Utils.logMessage(`${monsterInGY.name} is Special Summoned from the Graveyard!`, owner);
                    DOMManager.renderField();
                    DOMManager.updateDeckCounters();
                }
                break;

            case 'boost_atk_300':
                // Boost ATK
                const myMonsters = owner === 'player' ? gameState.playerMonsters : gameState.opponentMonsters;
                const firstMonster = myMonsters.find(c => c && c.faceUp);
                if (firstMonster) {
                    firstMonster.atk = (firstMonster.atk || 0) + 300;
                    Utils.logMessage(`${firstMonster.name} gains 300 ATK!`, owner);
                    DOMManager.renderField();
                }
                break;
        }
    },

    // Click monster on field (attack selection)
    onFieldMonsterClick(cardInstance, cardEl) {
        if (!Utils.isPlayerTurn()) return;
        if (gameState.currentPhase !== CONFIG.PHASES.BATTLE) {
            Utils.showToast('Not Battle Phase', 'You can only attack during the Battle Phase.', 'error');
            return;
        }

        if (!cardInstance.faceUp || cardInstance.position !== 'attack') {
            Utils.showToast('Cannot Attack', 'Only face-up Attack Position monsters can attack.', 'error');
            return;
        }

        if (gameState.attackedThisTurn.has(cardInstance.uniqueId)) {
            Utils.showToast('Already Attacked', 'This monster has already attacked this turn.', 'error');
            return;
        }

        // Check if opponent has monsters
        const opponentHasMonsters = gameState.opponentMonsters.some(m => m !== null);

        if (!opponentHasMonsters) {
            // Direct attack
            this.declareDirectAttack(cardInstance);
        } else {
            // Enter targeting mode
            gameState.selectedCard = cardInstance;
            gameState.targetingMode = true;
            cardEl.classList.add('selected');

            // Highlight opponent's monsters as targetable
            document.querySelectorAll('.opponent-field .monster-zone').forEach(zone => {
                if (zone.classList.contains('occupied')) {
                    zone.classList.add('targetable');
                }
            });

            Utils.showToast('Select Target', 'Click an opponent\'s monster to attack.', 'info');
        }
    },

    // Right click monster on field
    onFieldMonsterRightClick(cardInstance, cardEl, event) {
        if (!Utils.isPlayerTurn()) return;

        gameState.contextMenuTarget = { cardInstance, cardEl };

        const menu = DOMManager.elements.contextMenu;
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.classList.remove('hidden');

        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.style.display = 'none';
        });

        if (cardInstance.faceUp) {
            document.querySelector('[data-action="change-pos"]').style.display = '';
            if (gameState.currentPhase === CONFIG.PHASES.BATTLE) {
                document.querySelector('[data-action="attack"]').style.display = '';
            }
        } else {
            document.querySelector('[data-action="flip"]').style.display = '';
        }

        document.querySelector('[data-action="cancel"]').style.display = '';
    },

    // Click opponent's monster (attack target)
    onOpponentMonsterClick(cardInstance, zoneIndex) {
        if (!gameState.targetingMode || !gameState.selectedCard) return;

        this.declareAttack(gameState.selectedCard, cardInstance, zoneIndex);
    },

    // Declare attack on monster
    async declareAttack(attacker, defender, defenderZoneIndex) {
        // Clear targeting
        gameState.targetingMode = false;
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));

        const attackerEl = document.querySelector(`[data-unique-id="${attacker.uniqueId}"]`);

        // Attack animation
        if (attackerEl) {
            attackerEl.classList.add('attack-lunge');
            setTimeout(() => attackerEl.classList.remove('attack-lunge'), 600);
        }

        DOMManager.showBattleMessage('ATTACK!', 'attack');
        Utils.playSound('sfx-attack');

        await Utils.delay(600);

        // Resolve battle
        const result = Utils.calculateBattleDamage(attacker, defender, defender.position);

        // Apply damage to defender's LP
        if (result.damage > 0) {
            if (defender.position === 'attack') {
                await GameController.dealDamage('opponent', result.damage);
            } else {
                await GameController.dealDamage('player', result.damage);
            }
            DOMManager.screenShake('medium');
            DOMManager.impactFlash();
        }

        // Destroy cards
        if (result.defenderDestroyed) {
            gameState.opponentMonsters[defenderZoneIndex] = null;
            gameState.opponentGraveyard.push(defender);
            gameState.opponentGYCount++;
            Utils.logMessage(`${defender.name} is destroyed!`, 'damage');
        }

        if (result.attackerDestroyed) {
            const attackerZoneIndex = gameState.playerMonsters.indexOf(attacker);
            if (attackerZoneIndex !== -1) {
                gameState.playerMonsters[attackerZoneIndex] = null;
                gameState.playerGraveyard.push(attacker);
                gameState.playerGYCount++;
                Utils.logMessage(`${attacker.name} is destroyed!`, 'damage');
            }
        }

        // Mark as attacked
        gameState.attackedThisTurn.add(attacker.uniqueId);

        DOMManager.renderField();
        DOMManager.updateDeckCounters();
        gameState.selectedCard = null;

        await Utils.delay(500);
    },

    // Direct attack
    async declareDirectAttack(attacker) {
        gameState.targetingMode = false;

        const attackerEl = document.querySelector(`[data-unique-id="${attacker.uniqueId}"]`);

        if (attackerEl) {
            attackerEl.classList.add('attack-lunge');
            setTimeout(() => attackerEl.classList.remove('attack-lunge'), 600);
        }

        DOMManager.showBattleMessage('DIRECT ATTACK!', 'direct');
        Utils.playSound('sfx-attack');

        await Utils.delay(600);

        const damage = attacker.atk || 0;
        await GameController.dealDamage('opponent', damage);

        DOMManager.screenShake('heavy');
        DOMManager.impactFlash();

        gameState.attackedThisTurn.add(attacker.uniqueId);

        await Utils.delay(500);
    },

    // Click spell/trap on field
    onFieldSpellTrapClick(cardInstance, cardEl) {
        if (!Utils.isPlayerTurn()) return;

        if (cardInstance.type === CONFIG.CARD_TYPES.SPELL && !cardInstance.faceUp) {
            // Flip activate
            this.activateSetSpell(cardInstance);
        }
    },

    // Activate set spell/trap
    async activateSetSpell(cardInstance) {
        cardInstance.faceUp = true;

        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Yami Yugi activates ${cardInstance.name}!`, 'player');

        await this.resolveSpellEffect(cardInstance, 'player');

        // Send to graveyard
        gameState.playerSpellsTraps[cardInstance.zoneIndex] = null;
        gameState.playerGraveyard.push(cardInstance);
        gameState.playerGYCount++;

        DOMManager.renderField();
        DOMManager.updateDeckCounters();

        await Utils.delay(600);
    }
};

// ============================================= //
// 9. GAME CONTROLLER (Main Game Logic)          //
// ============================================= //

const GameController = {
    // Initialize game
    async init() {
        DOMManager.init();
        gameState = new GameState();

        this.bindEventListeners();
        this.initCursorFollower();

        await this.runLoadingSequence();
    },

    // Run loading sequence
    async runLoadingSequence() {
        const loadingTexts = [
            'INITIALIZING DUEL DISK...',
            'LOADING CARD DATABASE...',
            'CONNECTING TO SHADOW REALM...',
            'PREPARING DECKS...',
            'CALIBRATING SENSORS...',
            'READY TO DUEL!'
        ];

        for (let i = 0; i <= 100; i += 5) {
            DOMManager.elements.loadingProgress.style.width = `${i}%`;
            DOMManager.elements.loadingPercent.textContent = `${i}%`;

            const textIndex = Math.floor(i / 20);
            if (textIndex < loadingTexts.length) {
                DOMManager.elements.loadingText.textContent = loadingTexts[textIndex];
            }

            await Utils.delay(50);
        }

        await Utils.delay(500);

        DOMManager.elements.loadingScreen.classList.remove('active');
        DOMManager.elements.mainMenu.classList.add('active');
    },

    // Start duel
    async startDuel() {
        DOMManager.elements.mainMenu.classList.remove('active');
        DOMManager.elements.gameContainer.classList.remove('hidden');
        gameState.gameState = 'playing';

        // Initialize decks
        gameState.playerDeck = Utils.shuffleArray([...PLAYER_DECK]).map(id => Utils.createCardInstance(id));
        gameState.opponentDeck = Utils.shuffleArray([...OPPONENT_DECK]).map(id => Utils.createCardInstance(id));

        // Set owners
        gameState.playerDeck.forEach(c => c.owner = 'player');
        gameState.opponentDeck.forEach(c => c.owner = 'opponent');

        // Draw starting hands
        for (let i = 0; i < CONFIG.STARTING_HAND_SIZE; i++) {
            this.drawCard('player');
            this.drawCard('opponent');
        }

        gameState.playerDeckCount = gameState.playerDeck.length;
        gameState.opponentDeckCount = gameState.opponentDeck.length;

        DOMManager.updateLPDisplay('player', gameState.playerLP);
        DOMManager.updateLPDisplay('opponent', gameState.opponentLP);
        DOMManager.updateDeckCounters();

        DOMManager.renderPlayerHand();
        DOMManager.renderOpponentHand();
        DOMManager.renderField();

        Utils.logMessage('Duel Start! Yami Yugi vs Seto Kaiba!', 'system');
        Utils.showToast('DUEL START!', 'May the best duelist win!', 'success');

        // Start with player's turn
        await this.startTurn('player');
    },

    // Draw card
    drawCard(owner) {
        const deck = owner === 'player' ? gameState.playerDeck : gameState.opponentDeck;
        const hand = owner === 'player' ? gameState.playerHand : gameState.opponentHand;

        if (deck.length === 0) {
            // Deck out - lose
            this.endGame(owner === 'player' ? 'opponent' : 'player');
            return null;
        }

        const card = deck.shift();
        hand.push(card);

        if (owner === 'player') {
            gameState.playerDeckCount = deck.length;
        } else {
            gameState.opponentDeckCount = deck.length;
        }

        DOMManager.updateDeckCounters();

        if (owner === 'player') {
            DOMManager.renderPlayerHand();
            Utils.logMessage(`Yami Yugi draws a card.`, 'player');
        } else {
            DOMManager.renderOpponentHand();
            Utils.logMessage(`Seto Kaiba draws a card.`, 'opponent');
        }

        return card;
    },

    // Start turn
    async startTurn(owner) {
        gameState.turnOwner = owner;
        gameState.normalSummonUsed = false;
        gameState.attackedThisTurn.clear();
        gameState.hasDrawnThisTurn = false;
        gameState.battlePhaseEntered = false;

        // Reset summonedThisTurn flags
        const monsters = owner === 'player' ? gameState.playerMonsters : gameState.opponentMonsters;
        monsters.forEach(card => {
            if (card) {
                card.summonedThisTurn = false;
                card.hasAttacked = false;
            }
        });

        DOMManager.updatePhaseDisplay();
        DOMManager.updateActionButtons();

        // First turn skip draw for player
        if (gameState.turnNumber > 1 || owner === 'opponent') {
            await this.goToPhase(CONFIG.PHASES.DRAW);
        } else {
            await this.goToPhase(CONFIG.PHASES.MAIN1);
        }
    },

    // Go to phase
    async goToPhase(phase) {
        gameState.currentPhase = phase;
        DOMManager.updatePhaseDisplay();
        DOMManager.updateActionButtons();

        const phaseNames = {
            [CONFIG.PHASES.DRAW]: 'DRAW PHASE',
            [CONFIG.PHASES.STANDBY]: 'STANDBY PHASE',
            [CONFIG.PHASES.MAIN1]: 'MAIN PHASE 1',
            [CONFIG.PHASES.BATTLE]: 'BATTLE PHASE',
            [CONFIG.PHASES.MAIN2]: 'MAIN PHASE 2',
            [CONFIG.PHASES.END]: 'END PHASE'
        };

        await DOMManager.showPhaseTransition(phaseNames[phase]);

        switch (phase) {
            case CONFIG.PHASES.DRAW:
                await this.executeDrawPhase();
                break;
            case CONFIG.PHASES.STANDBY:
                await this.executeStandbyPhase();
                break;
            case CONFIG.PHASES.MAIN1:
            case CONFIG.PHASES.MAIN2:
                await this.executeMainPhase();
                break;
            case CONFIG.PHASES.BATTLE:
                await this.executeBattlePhase();
                break;
            case CONFIG.PHASES.END:
                await this.executeEndPhase();
                break;
        }
    },

    // Next phase logic
    async nextPhase() {
        const phaseOrder = [
            CONFIG.PHASES.DRAW,
            CONFIG.PHASES.STANDBY,
            CONFIG.PHASES.MAIN1,
            CONFIG.PHASES.BATTLE,
            CONFIG.PHASES.MAIN2,
            CONFIG.PHASES.END
        ];

        const currentIndex = phaseOrder.indexOf(gameState.currentPhase);

        if (currentIndex < phaseOrder.length - 1) {
            await this.goToPhase(phaseOrder[currentIndex + 1]);
        } else {
            // End of turn
            await this.endTurn();
        }
    },

    // Execute Draw Phase
    async executeDrawPhase() {
        if (!gameState.hasDrawnThisTurn) {
            this.drawCard(gameState.turnOwner);
            gameState.hasDrawnThisTurn = true;
            Utils.playSound('sfx-draw');

            // Auto advance to standby
            await Utils.delay(500);
            await this.goToPhase(CONFIG.PHASES.STANDBY);
        }
    },

    // Execute Standby Phase
    async executeStandbyPhase() {
        // Placeholder for card effects that trigger in standby
        await Utils.delay(300);
        await this.goToPhase(CONFIG.PHASES.MAIN1);
    },

    // Execute Main Phase
    async executeMainPhase() {
        if (gameState.turnOwner === 'opponent') {
            // AI takes control
            await AIOpponent.takeMainPhaseActions();
        }
        // Player waits for input
    },

    // Execute Battle Phase
    async executeBattlePhase() {
        gameState.battlePhaseEntered = true;

        if (gameState.turnOwner === 'opponent') {
            await AIOpponent.takeBattlePhaseActions();
        }
    },

    // Execute End Phase
    async executeEndPhase() {
        // End of turn effects would go here
        await Utils.delay(300);
        await this.endTurn();
    },

    // End turn
    async endTurn() {
        gameState.turnNumber++;

        const nextOwner = gameState.turnOwner === 'player' ? 'opponent' : 'player';

        await this.startTurn(nextOwner);
    },

    // Deal damage to LP
    async dealDamage(owner, amount) {
        if (owner === 'player') {
            gameState.playerLP = Math.max(0, gameState.playerLP - amount);
            DOMManager.updateLPDisplay('player', gameState.playerLP);
            gameState.damageDealt.opponent += amount;
        } else {
            gameState.opponentLP = Math.max(0, gameState.opponentLP - amount);
            DOMManager.updateLPDisplay('opponent', gameState.opponentLP);
            gameState.damageDealt.player += amount;
        }

        // Damage floater
        const hudId = owner === 'player' ? 'player-hud' : 'opponent-hud';
        const hudEl = document.getElementById(hudId);
        DOMManager.showDamageFloater(hudEl, amount);

        Utils.logMessage(`${owner === 'player' ? 'Yami Yugi' : 'Seto Kaiba'} takes ${amount} damage!`, 'damage');
        Utils.playSound('sfx-damage');

        // Check win condition
        if (gameState.playerLP <= 0) {
            await this.endGame('opponent');
        } else if (gameState.opponentLP <= 0) {
            await this.endGame('player');
        }

        await Utils.delay(500);
    },

    // Heal LP
    async healLP(owner, amount) {
        if (owner === 'player') {
            gameState.playerLP = Math.min(CONFIG.STARTING_LP, gameState.playerLP + amount);
            DOMManager.updateLPDisplay('player', gameState.playerLP);
        } else {
            gameState.opponentLP = Math.min(CONFIG.STARTING_LP, gameState.opponentLP + amount);
            DOMManager.updateLPDisplay('opponent', gameState.opponentLP);
        }

        Utils.logMessage(`${owner === 'player' ? 'Yami Yugi' : 'Seto Kaiba'} recovers ${amount} LP!`, 'system');

        await Utils.delay(500);
    },

    // End game
    async endGame(winner) {
        gameState.gameState = 'ended';
        gameState.winner = winner;

        const resultTitle = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');
        const resultDamage = document.getElementById('result-damage');
        const resultCards = document.getElementById('result-cards');
        const resultTurns = document.getElementById('result-turns');

        if (winner === 'player') {
            resultTitle.textContent = 'VICTORY!';
            resultTitle.className = 'result-title victory';
            resultSubtitle.textContent = 'You have defeated Seto Kaiba!';
            Utils.playSound('sfx-victory');
        } else {
            resultTitle.textContent = 'DEFEAT';
            resultTitle.className = 'result-title defeat';
            resultSubtitle.textContent = 'Seto Kaiba has defeated you...';
            Utils.playSound('sfx-defeat');
        }

        resultDamage.textContent = Utils.formatNumber(gameState.damageDealt.player);
        resultCards.textContent = gameState.cardsPlayed.player;
        resultTurns.textContent = gameState.turnNumber;

        await Utils.delay(500);
        document.getElementById('result-overlay').classList.remove('hidden');
    },

    // Rematch
    async rematch() {
        document.getElementById('result-overlay').classList.add('hidden');
        gameState.reset();
        DOMManager.elements.gameContainer.classList.add('hidden');
        await this.startDuel();
    },

    // Return to main menu
    returnToMenu() {
        document.getElementById('result-overlay').classList.add('hidden');
        DOMManager.elements.gameContainer.classList.add('hidden');
        DOMManager.elements.mainMenu.classList.add('active');
        gameState.reset();
    },

    // Bind event listeners
    bindEventListeners() {
        // Menu buttons
        DOMManager.elements.btnStartDuel?.addEventListener('click', () => this.startDuel());
        DOMManager.elements.btnDeckBuilder?.addEventListener('click', () => Utils.showToast('Coming Soon', 'Deck Builder is under development.', 'info'));
        DOMManager.elements.btnTutorial?.addEventListener('click', () => Utils.showToast('Coming Soon', 'Tutorial is under development.', 'info'));
        DOMManager.elements.btnSettings?.addEventListener('click', () => {
            DOMManager.elements.settingsModal.classList.add('active');
        });

        // Action buttons
        DOMManager.elements.btnNextPhase?.addEventListener('click', () => {
            if (Utils.isPlayerTurn()) this.nextPhase();
        });
        DOMManager.elements.btnEndTurn?.addEventListener('click', () => {
            if (Utils.isPlayerTurn()) this.endTurn();
        });
        DOMManager.elements.btnCancel?.addEventListener('click', () => {
            gameState.selectedCard = null;
            gameState.targetingMode = false;
            document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));
        });
        DOMManager.elements.btnSurrender?.addEventListener('click', async () => {
            const confirmed = await DOMManager.showDialog('Surrender?', 'Are you sure you want to surrender this duel?');
            if (confirmed) {
                await this.endGame('opponent');
            }
        });

        // Result buttons
        document.getElementById('btn-rematch')?.addEventListener('click', () => this.rematch());
        document.getElementById('btn-main-menu')?.addEventListener('click', () => this.returnToMenu());

        // Inspector close
        DOMManager.elements.inspectorClose?.addEventListener('click', () => CardInspector.hide());

        // Graveyard
        DOMManager.elements.graveyardClose?.addEventListener('click', () => DOMManager.hideGraveyard());

        document.getElementById('player-gy-count')?.addEventListener('click', () => {
            DOMManager.showGraveyard('player');
        });

        document.getElementById('opponent-gy-count')?.addEventListener('click', () => {
            DOMManager.showGraveyard('opponent');
        });

        // Deck modal close
        DOMManager.elements.deckClose?.addEventListener('click', () => {
            DOMManager.elements.deckModal.classList.remove('active');
        });

        // Settings close
        DOMManager.elements.settingsClose?.addEventListener('click', () => {
            DOMManager.elements.settingsModal.classList.remove('active');
        });

        // Dialog
        DOMManager.elements.dialogCancel?.addEventListener('click', () => {
            DOMManager.elements.dialogModal.classList.remove('active');
        });

        // Log toggle
        DOMManager.elements.logToggle?.addEventListener('click', () => {
            DOMManager.elements.logContent.classList.toggle('collapsed');
            DOMManager.elements.logToggle.classList.toggle('collapsed');
        });

        // Context menu actions
        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                this.handleContextAction(action);
                DOMManager.elements.contextMenu.classList.add('hidden');
            });
        });

        // Close context menu on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.context-menu-container') && !e.target.closest('.card')) {
                DOMManager.elements.contextMenu.classList.add('hidden');
            }
        });

        // Opponent monster zones (for targeting)
        document.querySelectorAll('.opponent-field .monster-zone').forEach(zone => {
            zone.addEventListener('click', () => {
                if (gameState.targetingMode && gameState.selectedCard) {
                    const index = parseInt(zone.dataset.index);
                    const targetCard = gameState.opponentMonsters[index];
                    if (targetCard) {
                        PlayerActions.onOpponentMonsterClick(targetCard, index);
                    }
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ' ':
                case 'Space':
                    e.preventDefault();
                    if (Utils.isPlayerTurn()) this.nextPhase();
                    break;
                case 'Escape':
                    if (gameState.targetingMode) {
                        gameState.selectedCard = null;
                        gameState.targetingMode = false;
                        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                        document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));
                    }
                    DOMManager.elements.contextMenu.classList.add('hidden');
                    break;
                case 'g':
                case 'G':
                    DOMManager.showGraveyard('player');
                    break;
                case '`':
                    DOMManager.elements.debugPanel.classList.toggle('hidden');
                    break;
            }
        });

        // Debug panel buttons
        document.querySelectorAll('.debug-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleDebugAction(btn.dataset.debug);
            });
        });

        DOMManager.elements.debugClose?.addEventListener('click', () => {
            DOMManager.elements.debugPanel.classList.add('hidden');
        });
    },

    // Handle context menu actions
    handleContextAction(action) {
        const target = gameState.contextMenuTarget;
        if (!target) return;

        const { cardInstance } = target;

        switch (action) {
            case 'summon-atk':
                if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
                    const emptyZone = gameState.playerMonsters.findIndex(z => z === null);
                    if (emptyZone !== -1) {
                        PlayerActions.summonMonster(cardInstance, emptyZone, 'attack');
                    }
                }
                break;

            case 'summon-def':
                if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
                    const emptyZone = gameState.playerMonsters.findIndex(z => z === null);
                    if (emptyZone !== -1) {
                        PlayerActions.setMonster(cardInstance, emptyZone);
                    }
                }
                break;

            case 'set-spell':
                if (cardInstance.type === CONFIG.CARD_TYPES.SPELL || cardInstance.type === CONFIG.CARD_TYPES.TRAP) {
                    const emptyZone = gameState.playerSpellsTraps.findIndex(z => z === null);
                    if (emptyZone !== -1) {
                        PlayerActions.setSpellTrap(cardInstance, emptyZone);
                    }
                }
                break;

            case 'activate':
                if (cardInstance.type === CONFIG.CARD_TYPES.SPELL) {
                    PlayerActions.activateSpell(cardInstance);
                }
                break;

            case 'attack':
                if (gameState.currentPhase === CONFIG.PHASES.BATTLE) {
                    PlayerActions.onFieldMonsterClick(cardInstance, target.cardEl);
                }
                break;

            case 'flip':
                // Flip summon
                if (!cardInstance.faceUp && cardInstance.position === 'defense') {
                    cardInstance.faceUp = true;
                    cardInstance.position = 'attack';
                    DOMManager.renderMonsterOnField('player', cardInstance.zoneIndex, cardInstance);
                    DOMManager.showBattleMessage('FLIP SUMMON!', 'summon');
                    Utils.logMessage(`Yami Yugi Flip Summons ${cardInstance.name}!`, 'player');
                }
                break;

            case 'change-pos':
                // Change battle position
                if (cardInstance.faceUp) {
                    cardInstance.position = cardInstance.position === 'attack' ? 'defense' : 'attack';
                    DOMManager.renderMonsterOnField('player', cardInstance.zoneIndex, cardInstance);
                    Utils.logMessage(`${cardInstance.name} changes to ${cardInstance.position} position.`, 'player');
                }
                break;

            case 'cancel':
                break;
        }

        gameState.contextMenuTarget = null;
    },

    // Debug actions
    handleDebugAction(action) {
        switch (action) {
            case 'player-lp-1000':
                this.dealDamage('player', 1000);
                break;
            case 'opponent-lp-1000':
                this.dealDamage('opponent', 1000);
                break;
            case 'heal-all':
                gameState.playerLP = CONFIG.STARTING_LP;
                gameState.opponentLP = CONFIG.STARTING_LP;
                DOMManager.updateLPDisplay('player', gameState.playerLP);
                DOMManager.updateLPDisplay('opponent', gameState.opponentLP);
                break;
            case 'draw-1':
                this.drawCard('player');
                break;
            case 'draw-5':
                for (let i = 0; i < 5; i++) this.drawCard('player');
                break;
            case 'add-dark-magician':
                const dm = Utils.createCardInstance('dark-magician');
                dm.owner = 'player';
                gameState.playerHand.push(dm);
                DOMManager.renderPlayerHand();
                break;
            case 'add-blue-eyes':
                const bed = Utils.createCardInstance('blue-eyes-white-dragon');
                bed.owner = 'player';
                gameState.playerHand.push(bed);
                DOMManager.renderPlayerHand();
                break;
            case 'skip-to-battle':
                gameState.currentPhase = CONFIG.PHASES.BATTLE;
                DOMManager.updatePhaseDisplay();
                break;
            case 'end-turn':
                this.endTurn();
                break;
            case 'reset-game':
                location.reload();
                break;
            case 'force-win':
                this.endGame('player');
                break;
        }

        this.debugLog(`Executed: ${action}`);
    },

    // Debug log
    debugLog(message) {
        const log = DOMManager.elements.debugLog;
        if (!log) return;

        const entry = document.createElement('div');
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    },

    // Initialize cursor follower
    initCursorFollower() {
        const follower = DOMManager.elements.cursorFollower;
        const followerInner = DOMManager.elements.cursorFollowerInner;

        if (!follower || !followerInner) return;

        document.addEventListener('mousemove', (e) => {
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
            followerInner.style.left = `${e.clientX}px`;
            followerInner.style.top = `${e.clientY}px`;

            // Check if hovering over interactive element
            const target = e.target;
            if (target.closest('.card') || target.closest('button') || target.closest('.zone')) {
                follower.classList.add('hovering');
            } else {
                follower.classList.remove('hovering');
            }
        });
    }
};

// ============================================= //
// 10. AI OPPONENT (KAIBA)                       //
// ============================================= //

const AIOpponent = {
    // Main AI logic for main phase
    async takeMainPhaseActions() {
        await Utils.delay(CONFIG.AI_THINK_DELAY);

        // 1. Try to activate spell cards from hand
        await this.tryActivateSpells();

        // 2. Try to summon strongest available monster
        await this.trySummonMonster();

        // 3. Set remaining cards if possible
        await this.trySetCards();

        await Utils.delay(CONFIG.AI_ACTION_DELAY);

        // Proceed to battle phase
        await GameController.nextPhase();
    },

    // AI tries to activate spells
    async tryActivateSpells() {
        const spells = gameState.opponentHand.filter(c => c.type === CONFIG.CARD_TYPES.SPELL);

        for (const spell of spells) {
            // Check if we should use this spell
            if (spell.effect === 'destroy_all_monsters' && gameState.playerMonsters.some(m => m !== null)) {
                await this.activateAISpell(spell);
                break;
            }

            if (spell.effect === 'burn_800') {
                await this.activateAISpell(spell);
                break;
            }

            if (spell.effect === 'special_summon_gy') {
                const hasMonsterInGY = gameState.opponentGraveyard.some(c => c.type === CONFIG.CARD_TYPES.MONSTER);
                const hasEmptyZone = gameState.opponentMonsters.some(z => z === null);
                if (hasMonsterInGY && hasEmptyZone) {
                    await this.activateAISpell(spell);
                    break;
                }
            }
        }
    },

    // AI activates a spell
    async activateAISpell(cardInstance) {
        gameState.opponentHand = gameState.opponentHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Seto Kaiba activates ${cardInstance.name}!`, 'opponent');

        await Utils.delay(CONFIG.AI_ACTION_DELAY);

        // Resolve effect
        await PlayerActions.resolveSpellEffect(cardInstance, 'opponent');

        // Send to GY
        gameState.opponentGraveyard.push(cardInstance);
        gameState.opponentGYCount++;
        DOMManager.updateDeckCounters();
        DOMManager.renderOpponentHand();

        await Utils.delay(CONFIG.AI_ACTION_DELAY);
    },

    // AI tries to summon monster
    async trySummonMonster() {
        const monsters = gameState.opponentHand
            .filter(c => c.type === CONFIG.CARD_TYPES.MONSTER)
            .sort((a, b) => (b.atk || 0) - (a.atk || 0));

        const emptyZone = gameState.opponentMonsters.findIndex(z => z === null);

        if (monsters.length > 0 && emptyZone !== -1) {
            const bestMonster = monsters[0];

            // Remove from hand
            gameState.opponentHand = gameState.opponentHand.filter(c => c.uniqueId !== bestMonster.uniqueId);

            // Set up card
            bestMonster.owner = 'opponent';
            bestMonster.zoneIndex = emptyZone;
            bestMonster.zoneType = 'monster';
            bestMonster.position = 'attack';
            bestMonster.faceUp = true;
            bestMonster.summonedThisTurn = true;

            gameState.opponentMonsters[emptyZone] = bestMonster;
            gameState.cardsPlayed.opponent++;

            DOMManager.renderOpponentHand();
            DOMManager.renderMonsterOnField('opponent', emptyZone, bestMonster);

            // Summon effect
            const zoneEl = document.getElementById(`opponent-monster-${emptyZone}`);
            if (zoneEl) {
                const summonEffect = document.createElement('div');
                summonEffect.className = 'summon-effect';
                zoneEl.appendChild(summonEffect);
                setTimeout(() => summonEffect.remove(), 1000);
            }

            DOMManager.showBattleMessage('SUMMON!', 'summon');
            Utils.playSound('sfx-summon');
            Utils.logMessage(`Seto Kaiba summons ${bestMonster.name}!`, 'opponent');

            await Utils.delay(CONFIG.AI_ACTION_DELAY);
        }
    },

    // AI sets cards
    async trySetCards() {
        const settableCards = gameState.opponentHand.filter(c =>
            c.type === CONFIG.CARD_TYPES.TRAP || c.type === CONFIG.CARD_TYPES.SPELL
        );

        for (const card of settableCards) {
            const emptyZone = gameState.opponentSpellsTraps.findIndex(z => z === null);
            if (emptyZone !== -1) {
                gameState.opponentHand = gameState.opponentHand.filter(c => c.uniqueId !== card.uniqueId);

                card.owner = 'opponent';
                card.zoneIndex = emptyZone;
                card.zoneType = 'spelltrap';
                card.faceUp = false;

                gameState.opponentSpellsTraps[emptyZone] = card;

                DOMManager.renderSpellTrapOnField('opponent', emptyZone, card);
                DOMManager.renderOpponentHand();

                Utils.logMessage(`Seto Kaiba sets a card.`, 'opponent');
                await Utils.delay(CONFIG.AI_ACTION_DELAY);
                break;
            }
        }
    },

    // AI battle phase actions
    async takeBattlePhaseActions() {
        await Utils.delay(CONFIG.AI_THINK_DELAY);

        // Find all opponent monsters that can attack
        const attackableMonsters = gameState.opponentMonsters.filter(
            m => m && m.faceUp && m.position === 'attack' && !m.hasAttacked && !m.summonedThisTurn
        );

        // Sort by ATK (strongest first)
        attackableMonsters.sort((a, b) => (b.atk || 0) - (a.atk || 0));

        for (const attacker of attackableMonsters) {
            // Check if player has monsters
            const playerMonsters = gameState.playerMonsters
                .map((m, i) => ({ card: m, index: i }))
                .filter(m => m.card !== null);

            if (playerMonsters.length === 0) {
                // Direct attack
                await this.aiDirectAttack(attacker);
            } else {
                // Find best target
                const target = this.findBestTarget(attacker, playerMonsters);
                if (target) {
                    await this.aiAttack(attacker, target.card, target.index);
                }
            }

            await Utils.delay(CONFIG.AI_ATTACK_DELAY);

            // Check if game ended
            if (gameState.gameState === 'ended') break;
        }

        // End battle phase
        await Utils.delay(CONFIG.AI_ACTION_DELAY);
        await GameController.nextPhase();
    },

    // Find best attack target
    findBestTarget(attacker, playerMonsters) {
        const attackerAtk = attacker.atk || 0;

        // Priority 1: Attack monsters we can destroy without losing our monster
        const destroyableTargets = playerMonsters.filter(t => {
            if (t.card.position === 'attack') {
                return attackerAtk > (t.card.atk || 0);
            } else {
                return attackerAtk > (t.card.def || 0);
            }
        });

        if (destroyableTargets.length > 0) {
            // Choose the one that deals most damage
            return destroyableTargets.sort((a, b) => {
                const damageA = a.card.position === 'attack' ? attackerAtk - (a.card.atk || 0) : 0;
                const damageB = b.card.position === 'attack' ? attackerAtk - (b.card.atk || 0) : 0;
                return damageB - damageA;
            })[0];
        }

        // Priority 2: Attack weakest monster anyway
        return playerMonsters.sort((a, b) => {
            const valueA = a.card.position === 'attack' ? (a.card.atk || 0) : (a.card.def || 0);
            const valueB = b.card.position === 'attack' ? (b.card.atk || 0) : (b.card.def || 0);
            return valueA - valueB;
        })[0];
    },

    // AI attacks a monster
    async aiAttack(attacker, defender, defenderZoneIndex) {
        const attackerEl = document.querySelector(`[data-unique-id="${attacker.uniqueId}"]`);

        if (attackerEl) {
            attackerEl.classList.add('attack-lunge');
            setTimeout(() => attackerEl.classList.remove('attack-lunge'), 600);
        }

        DOMManager.showBattleMessage('ATTACK!', 'attack');
        Utils.playSound('sfx-attack');
        Utils.logMessage(`Seto Kaiba's ${attacker.name} attacks ${defender.name}!`, 'opponent');

        await Utils.delay(600);

        // Resolve battle
        const result = Utils.calculateBattleDamage(attacker, defender, defender.position);

        // Apply damage
        if (result.damage > 0) {
            if (defender.position === 'attack') {
                await GameController.dealDamage('player', result.damage);
            } else {
                await GameController.dealDamage('opponent', result.damage);
            }
            DOMManager.screenShake('medium');
            DOMManager.impactFlash();
        }

        // Destroy cards
        if (result.defenderDestroyed) {
            gameState.playerMonsters[defenderZoneIndex] = null;
            gameState.playerGraveyard.push(defender);
            gameState.playerGYCount++;
            Utils.logMessage(`${defender.name} is destroyed!`, 'damage');
        }

        if (result.attackerDestroyed) {
            const attackerZoneIndex = gameState.opponentMonsters.indexOf(attacker);
            if (attackerZoneIndex !== -1) {
                gameState.opponentMonsters[attackerZoneIndex] = null;
                gameState.opponentGraveyard.push(attacker);
                gameState.opponentGYCount++;
                Utils.logMessage(`${attacker.name} is destroyed!`, 'damage');
            }
        }

        attacker.hasAttacked = true;

        DOMManager.renderField();
        DOMManager.updateDeckCounters();

        await Utils.delay(500);
    },

    // AI direct attack
    async aiDirectAttack(attacker) {
        const attackerEl = document.querySelector(`[data-unique-id="${attacker.uniqueId}"]`);

        if (attackerEl) {
            attackerEl.classList.add('attack-lunge');
            setTimeout(() => attackerEl.classList.remove('attack-lunge'), 600);
        }

        DOMManager.showBattleMessage('DIRECT ATTACK!', 'direct');
        Utils.playSound('sfx-attack');
        Utils.logMessage(`${attacker.name} attacks directly!`, 'opponent');

        await Utils.delay(600);

        const damage = attacker.atk || 0;
        await GameController.dealDamage('player', damage);

        DOMManager.screenShake('heavy');
        DOMManager.impactFlash();

        attacker.hasAttacked = true;

        await Utils.delay(500);
    }
};

// ============================================= //
// 11. INITIALIZATION                            //
// ============================================= //

// Global game state
let gameState;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    GameController.init();
});

// Prevent context menu globally
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.card')) {
        e.preventDefault();
    }
});

// Disable drag on images
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ============================================= //
// 12. END OF MASTER GAME ENGINE                 //
// ============================================= //

console.log('%c YU-GI-OH! HTML EDITION ', 'background: linear-gradient(90deg, #ffd700, #00ffff); color: #000; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c Version 3.8 MAX - Powered by Qwen 3.8 Max ', 'color: #00ffff; font-size: 12px;');
console.log('%c Type ` to open debug panel ', 'color: #ffd700; font-size: 10px;');
