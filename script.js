/* ===================================================================
   YU-GI-OH! HTML EDITION - ULTIMATE GAME ENGINE
   Version: 3.8 ULTIMATE
   Author: Qwen 3.8 Max
   Fully Functional Card Game with AI Opponent
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
    AI_THINK_DELAY: 1200,
    AI_ACTION_DELAY: 600,
    AI_ATTACK_DELAY: 1000,

    // Phases
    PHASES: {
        DRAW: 'draw',
        STANDBY: 'standby',
        MAIN1: 'main1',
        BATTLE: 'battle',
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
        BEAST: 'Beast-Warrior',
        FIEND: 'Fiend',
        MACHINE: 'Machine',
        FAIRY: 'Fairy'
    },

    // UI Settings
    TOAST_DURATION: 3000,
    LOG_MAX_ENTRIES: 50
};

// ============================================= //
// 2. CARD DATABASE (EXPANDED)                   //
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
        rarity: 'Super Rare',
        effect: 'hand_discard_negate_damage'
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
    'swords-of-revealing-light': {
        id: 72302403,
        name: 'Swords of Revealing Light',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/72302403.jpg',
        description: 'Flip all monsters your opponent controls face-up. These monsters cannot attack for 3 turns.',
        rarity: 'Super Rare',
        effect: 'flip_and_lock'
    },
    'mirror-force': {
        id: 44095762,
        name: 'Mirror Force',
        type: CONFIG.CARD_TYPES.TRAP,
        image: 'https://images.ygoprodeck.com/images/cards/44095762.jpg',
        description: 'When an opponent\'s monster declares an attack: Destroy all ATK Position monsters your opponent controls.',
        rarity: 'Ultra Rare',
        effect: 'destroy_all_attack_position'
    },
    'fissure': {
        id: 74845895,
        name: 'Fissure',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/74845895.jpg',
        description: 'Destroy the 1 face-up monster your opponent controls with the lowest ATK.',
        rarity: 'Rare',
        effect: 'destroy_lowest_atk'
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
    'la-jinn': {
        id: 79335209,
        name: 'La Jinn the Mystical Genie',
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
    'lord-of-d': {
        id: 17985575,
        name: 'Lord of D.',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 4,
        attribute: CONFIG.ATTRIBUTES.DARK,
        monsterType: CONFIG.MONSTER_TYPES.SPELLCASTER,
        atk: 1200,
        def: 1100,
        image: 'https://images.ygoprodeck.com/images/cards/17985575.jpg',
        description: 'Dragon monsters on the field cannot be targeted by Spells, Traps, or monster effects that target.',
        rarity: 'Super Rare',
        effect: 'protect_dragons'
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
    'enemy-controller': {
        id: 98045062,
        name: 'Enemy Controller',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/98045062.jpg',
        description: 'Target 1 face-up monster your opponent controls; take control of it until the End Phase.',
        rarity: 'Super Rare',
        effect: 'take_control'
    },
    'crush-card-virus': {
        id: 57728570,
        name: 'Crush Card Virus',
        type: CONFIG.CARD_TYPES.TRAP,
        image: 'https://images.ygoprodeck.com/images/cards/57728570.jpg',
        description: 'Tribute 1 DARK monster with 1000 or less ATK; destroy all monsters your opponent controls with 1500 or more ATK.',
        rarity: 'Ultra Rare',
        effect: 'destroy_high_atk'
    },
    'giant-soldier-of-stone': {
        id: 46009933,
        name: 'Giant Soldier of Stone',
        type: CONFIG.CARD_TYPES.MONSTER,
        level: 3,
        attribute: CONFIG.ATTRIBUTES.EARTH,
        monsterType: CONFIG.MONSTER_TYPES.WARRIOR,
        atk: 1300,
        def: 2000,
        image: 'https://images.ygoprodeck.com/images/cards/46009933.jpg',
        description: 'A solid-bodied warrior of stone.',
        rarity: 'Common'
    },
    'ookazi': {
        id: 70046172,
        name: 'Ookazi',
        type: CONFIG.CARD_TYPES.SPELL,
        image: 'https://images.ygoprodeck.com/images/cards/70046172.jpg',
        description: 'Inflict 800 damage to your opponent.',
        rarity: 'Common',
        effect: 'burn_800'
    }
};

// ============================================= //
// 3. DECK DEFINITIONS                           //
// ============================================= //

const PLAYER_DECK = [
    'dark-magician', 'dark-magician',
    'celtic-guardian', 'celtic-guardian', 'celtic-guardian',
    'kuriboh', 'kuriboh',
    'axe-raider', 'axe-raider',
    'la-jinn', 'la-jinn',
    'mystical-space-typhoon', 'mystical-space-typhoon',
    'swords-of-revealing-light',
    'mirror-force', 'mirror-force',
    'fissure', 'fissure',
    'dark-hole',
    'dark-hole'
];

const OPPONENT_DECK = [
    'blue-eyes-white-dragon', 'blue-eyes-white-dragon',
    'vorse-raider', 'vorse-raider', 'vorse-raider',
    'vorse-raider', 'vorse-raider',
    'lord-of-d', 'lord-of-d',
    'giant-soldier-of-stone', 'giant-soldier-of-stone',
    'monster-reborn', 'monster-reborn',
    'enemy-controller',
    'crush-card-virus',
    'mystical-space-typhoon', 'mystical-space-typhoon',
    'ookazi', 'ookazi',
    'dark-hole'
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
        this.turnOwner = 'player';

        // Life Points
        this.playerLP = CONFIG.STARTING_LP;
        this.opponentLP = CONFIG.STARTING_LP;

        // Hands
        this.playerHand = [];
        this.opponentHand = [];

        // Decks
        this.playerDeck = [];
        this.opponentDeck = [];

        // Graveyards
        this.playerGraveyard = [];
        this.opponentGraveyard = [];

        // Field Zones
        this.playerMonsters = [null, null, null];
        this.opponentMonsters = [null, null, null];

        this.playerSpellsTraps = [null, null, null];
        this.opponentSpellsTraps = [null, null, null];

        this.playerFieldSpell = null;
        this.opponentFieldSpell = null;

        // Turn Flags
        this.normalSummonUsed = false;
        this.hasDrawnThisTurn = false;
        this.attackedThisTurn = new Set();
        this.battlePhaseEntered = false;

        // Trap activation flags
        this.trapSetTurn = new Map(); // uniqueId -> turn number when set

        // Game State
        this.gameState = 'loading';
        this.winner = null;

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

        // Settings
        this.settings = {
            sfxEnabled: true,
            musicEnabled: true,
            animationSpeed: 'normal',
            showDamage: true,
            showPhases: true,
            bgEffects: true,
            particleEffects: true,
            cardGlow: true
        };
    }
}

// Global game state
let gameState = new GameState();

// ============================================= //
// 5. UTILITY FUNCTIONS                          //
// ============================================= //

const Utils = {
    generateUniqueId() {
        return `card_${gameState.nextCardId++}_${Date.now()}`;
    },

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getAnimationSpeed() {
        const setting = gameState.settings.animationSpeed || 'normal';
        return CONFIG.ANIMATION_SPEED[setting] || 1.0;
    },

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getCardData(cardId) {
        return CARD_DATABASE[cardId] || null;
    },

    createCardInstance(cardId, owner) {
        const cardData = this.getCardData(cardId);
        if (!cardData) return null;

        return {
            ...cardData,
            uniqueId: this.generateUniqueId(),
            cardId: cardId,
            position: 'attack',
            faceUp: true,
            hasAttacked: false,
            summonedThisTurn: true,
            owner: owner,
            zoneIndex: -1,
            zoneType: null
        };
    },

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
            const defValue = defender.def || 0;
            if (atkValue > defValue) {
                return {
                    damage: 0,
                    defenderDestroyed: true,
                    attackerDestroyed: false
                };
            } else if (atkValue < defValue) {
                return {
                    damage: defValue - atkValue,
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

    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    getElementCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    },

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

        while (logContent.children.length > CONFIG.LOG_MAX_ENTRIES) {
            logContent.removeChild(logContent.lastChild);
        }
    },

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

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.TOAST_DURATION);
    },

    playSound(soundId) {
        if (!gameState.settings.sfxEnabled) return;
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    },

    isPlayerTurn() {
        return gameState.turnOwner === 'player';
    },

    isOpponentTurn() {
        return gameState.turnOwner === 'opponent';
    },

    // Save settings to localStorage
    saveSettings() {
        try {
            localStorage.setItem('yugioh_settings', JSON.stringify(gameState.settings));
        } catch (e) {
            console.warn('Could not save settings:', e);
        }
    },

    // Load settings from localStorage
    loadSettings() {
        try {
            const saved = localStorage.getItem('yugioh_settings');
            if (saved) {
                gameState.settings = { ...gameState.settings, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load settings:', e);
        }
    }
};

// ============================================= //
// 6. DOM MANAGER                                //
// ============================================= //

const DOMManager = {
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

            // Modals
            graveyardModal: document.getElementById('graveyard-modal'),
            graveyardGrid: document.getElementById('graveyard-grid'),
            graveyardClose: document.getElementById('graveyard-close'),
            graveyardCloseBtn: document.getElementById('graveyard-close-btn'),
            graveyardOwnerLabel: document.getElementById('graveyard-owner-label'),

            dialogModal: document.getElementById('dialog-modal'),
            dialogTitle: document.getElementById('dialog-title'),
            dialogMessage: document.getElementById('dialog-message'),
            dialogConfirm: document.getElementById('dialog-confirm'),
            dialogCancel: document.getElementById('dialog-cancel'),

            settingsModal: document.getElementById('settings-modal'),
            settingsClose: document.getElementById('settings-close'),
            settingsSave: document.getElementById('settings-save'),

            tutorialOverlay: document.getElementById('tutorial-overlay'),
            tutorialStep: document.getElementById('tutorial-step'),
            tutorialTotal: document.getElementById('tutorial-total'),
            tutorialTitle: document.getElementById('tutorial-title'),
            tutorialImage: document.getElementById('tutorial-image'),
            tutorialText: document.getElementById('tutorial-text'),
            tutorialPrev: document.getElementById('tutorial-prev'),
            tutorialSkip: document.getElementById('tutorial-skip'),
            tutorialNext: document.getElementById('tutorial-next'),

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

            // Graveyard/Deck buttons
            btnPlayerGY: document.getElementById('btn-player-gy'),
            btnOpponentGY: document.getElementById('btn-opponent-gy'),
            btnPlayerDeck: document.getElementById('btn-player-deck'),
            btnOpponentDeck: document.getElementById('btn-opponent-deck'),
            btnPlayerGYField: document.getElementById('btn-player-graveyard'),
            btnOpponentGYField: document.getElementById('btn-opponent-graveyard'),

            // Target Selector
            targetSelector: document.getElementById('target-selector'),
            selectorTitle: document.getElementById('selector-title'),
            selectorText: document.getElementById('selector-text'),
            selectorCancel: document.getElementById('selector-cancel')
        };
    },

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

        const percentage = (newValue / CONFIG.STARTING_LP) * 100;
        bar.style.width = `${percentage}%`;

        if (percentage <= 25) {
            bar.style.background = 'linear-gradient(90deg, #ff003c 0%, #ff4444 100%)';
        } else if (percentage <= 50) {
            bar.style.background = 'linear-gradient(90deg, #ffd700 0%, #ffaa00 100%)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)';
        }
    },

    updateDeckCounters() {
        if (this.elements.playerDeckCount) this.elements.playerDeckCount.textContent = gameState.playerDeckCount;
        if (this.elements.opponentDeckCount) this.elements.opponentDeckCount.textContent = gameState.opponentDeckCount;
        if (this.elements.playerGYCount) this.elements.playerGYCount.textContent = gameState.playerGYCount;
        if (this.elements.opponentGYCount) this.elements.opponentGYCount.textContent = gameState.opponentGYCount;
    },

    updatePhaseDisplay() {
        const phaseNames = {
            [CONFIG.PHASES.DRAW]: 'DRAW PHASE',
            [CONFIG.PHASES.STANDBY]: 'STANDBY PHASE',
            [CONFIG.PHASES.MAIN1]: 'MAIN PHASE 1',
            [CONFIG.PHASES.BATTLE]: 'BATTLE PHASE',
            [CONFIG.PHASES.END]: 'END PHASE'
        };

        if (this.elements.currentPhaseName) {
            this.elements.currentPhaseName.textContent = phaseNames[gameState.currentPhase] || 'MAIN PHASE';
        }
        if (this.elements.turnCounter) {
            this.elements.turnCounter.textContent = gameState.turnNumber;
        }
        if (this.elements.turnOwner) {
            this.elements.turnOwner.textContent = gameState.turnOwner === 'player' ? 'YOUR TURN' : "OPPONENT'S TURN";
        }

        document.querySelectorAll('.phase-step').forEach(step => {
            step.classList.remove('active', 'completed');
        });

        const phaseOrder = ['draw', 'standby', 'main1', 'battle', 'end'];
        const currentIndex = phaseOrder.indexOf(gameState.currentPhase);

        phaseOrder.forEach((phase, index) => {
            const stepEl = document.querySelector(`.phase-step[data-phase="${phase}"]`);
            if (stepEl) {
                if (index < currentIndex) stepEl.classList.add('completed');
                if (index === currentIndex) stepEl.classList.add('active');
            }
        });
    },

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

    renderPlayerHand() {
        const container = this.elements.playerHandCards;
        if (!container) return;
        container.innerHTML = '';

        gameState.playerHand.forEach((cardInstance, index) => {
            const cardEl = this.createCardElement(cardInstance, { inHand: true });
            cardEl.style.zIndex = index + 1;

            // Click handler
            cardEl.addEventListener('click', () => PlayerActions.onHandCardClick(cardInstance, cardEl));

            // Right click / long press handler
            cardEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                PlayerActions.onHandCardRightClick(cardInstance, cardEl, e);
            });

            // Touch long press for mobile
            let touchTimer;
            cardEl.addEventListener('touchstart', (e) => {
                touchTimer = setTimeout(() => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    PlayerActions.onHandCardRightClick(cardInstance, cardEl, {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    });
                }, 500);
            });
            cardEl.addEventListener('touchend', () => clearTimeout(touchTimer));
            cardEl.addEventListener('touchmove', () => clearTimeout(touchTimer));

            // Hover for inspector
            cardEl.addEventListener('mouseenter', () => CardInspector.show(cardInstance));
            cardEl.addEventListener('mouseleave', () => CardInspector.hide());

            container.appendChild(cardEl);
        });
    },

    renderOpponentHand() {
        const container = this.elements.opponentHandCards;
        if (!container) return;
        container.innerHTML = '';

        gameState.opponentHand.forEach((cardInstance, index) => {
            const cardEl = this.createCardElement(cardInstance, { inHand: true, faceDown: true });
            cardEl.style.zIndex = index + 1;
            container.appendChild(cardEl);
        });
    },

    renderMonsterOnField(owner, zoneIndex, cardInstance) {
        const zoneId = owner === 'player' ? `player-monster-${zoneIndex}` : `opponent-monster-${zoneIndex}`;
        const zoneEl = document.getElementById(zoneId);

        if (!zoneEl) return;

        zoneEl.innerHTML = '';

        if (cardInstance) {
            const faceDown = !cardInstance.faceUp;
            const cardEl = this.createCardElement(cardInstance, { onField: true, faceDown });

            if (owner === 'player') {
                cardEl.addEventListener('click', () => PlayerActions.onFieldMonsterClick(cardInstance, cardEl));
                cardEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    PlayerActions.onFieldMonsterRightClick(cardInstance, cardEl, e);
                });

                // Touch long press
                let touchTimer;
                cardEl.addEventListener('touchstart', (e) => {
                    touchTimer = setTimeout(() => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        PlayerActions.onFieldMonsterRightClick(cardInstance, cardEl, {
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        });
                    }, 500);
                });
                cardEl.addEventListener('touchend', () => clearTimeout(touchTimer));
                cardEl.addEventListener('touchmove', () => clearTimeout(touchTimer));

                cardEl.addEventListener('mouseenter', () => {
                    if (cardInstance.faceUp) CardInspector.show(cardInstance);
                });
                cardEl.addEventListener('mouseleave', () => CardInspector.hide());
            }

            zoneEl.appendChild(cardEl);
            zoneEl.classList.add('occupied');
        } else {
            zoneEl.innerHTML = `
                <div class="zone-placeholder">
                    <div class="zone-icon">👾</div>
                    <div class="zone-label">MONSTER</div>
                </div>
            `;
            zoneEl.classList.remove('occupied');
        }
    },

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

    renderField() {
        gameState.playerMonsters.forEach((card, index) => {
            this.renderMonsterOnField('player', index, card);
        });

        gameState.opponentMonsters.forEach((card, index) => {
            this.renderMonsterOnField('opponent', index, card);
        });

        gameState.playerSpellsTraps.forEach((card, index) => {
            this.renderSpellTrapOnField('player', index, card);
        });

        gameState.opponentSpellsTraps.forEach((card, index) => {
            this.renderSpellTrapOnField('opponent', index, card);
        });
    },

    async showPhaseTransition(phaseName) {
        if (!gameState.settings.showPhases) return;

        const overlay = this.elements.phaseTransition;
        const text = this.elements.phaseTransitionText;

        if (!overlay || !text) return;

        text.textContent = phaseName;
        overlay.classList.remove('hidden');

        await Utils.delay(1000);

        overlay.classList.add('hidden');
    },

    showBattleMessage(text, type = 'summon') {
        const container = this.elements.battleMessages;
        if (!container) return;

        const msg = document.createElement('div');
        msg.className = `battle-message ${type}`;
        msg.textContent = text;
        container.appendChild(msg);

        setTimeout(() => msg.remove(), 2000);
    },

    showDamageFloater(targetElement, amount) {
        if (!gameState.settings.showDamage || !targetElement) return;

        const rect = targetElement.getBoundingClientRect();
        const container = this.elements.damageFloaters;
        if (!container) return;

        const floater = document.createElement('div');
        floater.className = 'damage-floater';
        floater.textContent = `-${amount}`;
        floater.style.left = `${rect.left + rect.width / 2}px`;
        floater.style.top = `${rect.top}px`;

        container.appendChild(floater);

        setTimeout(() => floater.remove(), 1500);
    },

    screenShake(intensity = 'light') {
        const gameContainer = this.elements.gameContainer;
        if (!gameContainer) return;

        gameContainer.classList.add(`shake-${intensity}`);
        setTimeout(() => {
            gameContainer.classList.remove(`shake-${intensity}`);
        }, 700);
    },

    impactFlash() {
        const flash = document.createElement('div');
        flash.className = 'impact-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
    },

    showGraveyard(owner) {
        const modal = this.elements.graveyardModal;
        const grid = this.elements.graveyardGrid;
        const label = this.elements.graveyardOwnerLabel;

        if (!modal || !grid || !label) return;

        const graveyard = owner === 'player' ? gameState.playerGraveyard : gameState.opponentGraveyard;
        label.textContent = owner === 'player' ? 'YOUR GRAVEYARD' : "OPPONENT'S GRAVEYARD";

        grid.innerHTML = '';

        if (graveyard.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px;">No cards in graveyard</div>';
        } else {
            graveyard.forEach(cardInstance => {
                const cardEl = this.createCardElement(cardInstance, {});
                cardEl.addEventListener('mouseenter', () => CardInspector.show(cardInstance));
                cardEl.addEventListener('mouseleave', () => CardInspector.hide());
                grid.appendChild(cardEl);
            });
        }

        modal.classList.add('active');
    },

    hideGraveyard() {
        if (this.elements.graveyardModal) {
            this.elements.graveyardModal.classList.remove('active');
        }
    },

    showDialog(title, message) {
        return new Promise((resolve) => {
            if (!this.elements.dialogTitle || !this.elements.dialogMessage) {
                resolve(false);
                return;
            }

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

    updateActionButtons() {
        const isPlayerTurn = Utils.isPlayerTurn();
        const phase = gameState.currentPhase;

        if (this.elements.btnNextPhase) this.elements.btnNextPhase.disabled = !isPlayerTurn;
        if (this.elements.btnEndTurn) this.elements.btnEndTurn.disabled = !isPlayerTurn;
        if (this.elements.btnSurrender) this.elements.btnSurrender.disabled = false;

        if (phase === CONFIG.PHASES.BATTLE) {
            if (this.elements.btnNextPhase) this.elements.btnNextPhase.querySelector('.btn-label').textContent = 'END BATTLE';
        } else if (phase === CONFIG.PHASES.END) {
            if (this.elements.btnNextPhase) this.elements.btnNextPhase.querySelector('.btn-label').textContent = 'NEXT TURN';
        } else {
            if (this.elements.btnNextPhase) this.elements.btnNextPhase.querySelector('.btn-label').textContent = 'NEXT PHASE';
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

        DOMManager.elements.inspectorDescription.textContent = cardInstance.description || 'No description available.';

        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            DOMManager.elements.inspectorAtk.textContent = cardInstance.atk;
            DOMManager.elements.inspectorDef.textContent = cardInstance.def;
            if (DOMManager.elements.inspectorStats) DOMManager.elements.inspectorStats.style.display = '';
        } else {
            DOMManager.elements.inspectorAtk.textContent = '/';
            DOMManager.elements.inspectorDef.textContent = '/';
        }

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
    onHandCardClick(cardInstance, cardEl) {
        if (!Utils.isPlayerTurn()) return;
        if (gameState.currentPhase !== CONFIG.PHASES.MAIN1) {
            Utils.showToast('Cannot Play', 'You can only play cards during Main Phase 1.', 'error');
            return;
        }

        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            if (gameState.normalSummonUsed) {
                Utils.showToast('Already Summoned', 'You can only Normal Summon/Set once per turn.', 'error');
                return;
            }
            const emptyZone = gameState.playerMonsters.findIndex(zone => zone === null);
            if (emptyZone === -1) {
                Utils.showToast('Zones Full', 'All monster zones are occupied.', 'error');
                return;
            }
            this.summonMonster(cardInstance, emptyZone, 'attack');
        }
        else if (cardInstance.type === CONFIG.CARD_TYPES.SPELL) {
            this.activateSpell(cardInstance);
        }
        else if (cardInstance.type === CONFIG.CARD_TYPES.TRAP) {
            const emptyZone = gameState.playerSpellsTraps.findIndex(zone => zone === null);
            if (emptyZone === -1) {
                Utils.showToast('Zones Full', 'All Spell/Trap zones are occupied.', 'error');
                return;
            }
            this.setSpellTrap(cardInstance, emptyZone);
        }
    },

    onHandCardRightClick(cardInstance, cardEl, event) {
        if (!Utils.isPlayerTurn()) return;
        if (gameState.currentPhase !== CONFIG.PHASES.MAIN1) return;

        gameState.contextMenuTarget = { cardInstance, cardEl };

        const menu = DOMManager.elements.contextMenu;
        if (!menu) return;

        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.classList.remove('hidden');

        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.style.display = 'none';
        });

        if (cardInstance.type === CONFIG.CARD_TYPES.MONSTER) {
            const summonAtk = document.querySelector('[data-action="summon-atk"]');
            const summonDef = document.querySelector('[data-action="summon-def"]');
            if (summonAtk) summonAtk.style.display = '';
            if (summonDef) summonDef.style.display = '';
        } else if (cardInstance.type === CONFIG.CARD_TYPES.SPELL) {
            const activate = document.querySelector('[data-action="activate"]');
            const setSpell = document.querySelector('[data-action="set-spell"]');
            if (activate) activate.style.display = '';
            if (setSpell) setSpell.style.display = '';
        } else if (cardInstance.type === CONFIG.CARD_TYPES.TRAP) {
            const setSpell = document.querySelector('[data-action="set-spell"]');
            if (setSpell) setSpell.style.display = '';
        }
        const cancel = document.querySelector('[data-action="cancel"]');
        if (cancel) cancel.style.display = '';
    },

    async summonMonster(cardInstance, zoneIndex, position) {
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

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

        DOMManager.renderPlayerHand();
        DOMManager.renderMonsterOnField('player', zoneIndex, cardInstance);

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

    async setMonster(cardInstance, zoneIndex) {
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

    async setSpellTrap(cardInstance, zoneIndex) {
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        cardInstance.owner = 'player';
        cardInstance.zoneIndex = zoneIndex;
        cardInstance.zoneType = 'spelltrap';
        cardInstance.faceUp = false;

        gameState.playerSpellsTraps[zoneIndex] = cardInstance;
        gameState.trapSetTurn.set(cardInstance.uniqueId, gameState.turnNumber);
        gameState.cardsPlayed.player++;

        DOMManager.renderPlayerHand();
        DOMManager.renderSpellTrapOnField('player', zoneIndex, cardInstance);

        Utils.logMessage(`Yami Yugi sets a card in the Spell/Trap zone.`, 'player');

        await Utils.delay(500);
    },

    async activateSpell(cardInstance) {
        gameState.playerHand = gameState.playerHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Yami Yugi activates ${cardInstance.name}!`, 'player');

        await this.resolveSpellEffect(cardInstance, 'player');

        gameState.playerGraveyard.push(cardInstance);
        gameState.playerGYCount++;
        DOMManager.updateDeckCounters();

        DOMManager.renderPlayerHand();

        await Utils.delay(800);
    },

    async resolveSpellEffect(cardInstance, owner) {
        const effect = cardInstance.effect;
        const opponent = owner === 'player' ? 'opponent' : 'player';

        switch (effect) {
            case 'destroy_spell_trap':
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
                        DOMManager.screenShake('medium');
                    }
                } else {
                    Utils.logMessage(`No Spell/Trap cards to destroy.`, 'system');
                }
                break;

            case 'destroy_all_monsters':
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

            case 'destroy_lowest_atk':
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
                await GameController.dealDamage(opponent, 800);
                break;

            case 'special_summon_gy':
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

            case 'flip_and_lock':
                // Swords of Revealing Light - flip opponent's monsters face-up
                const opponentField = owner === 'player' ? gameState.opponentMonsters : gameState.playerMonsters;
                opponentField.forEach(card => {
                    if (card && !card.faceUp) {
                        card.faceUp = true;
                    }
                });
                Utils.logMessage(`All opponent's monsters are flipped face-up!`, owner);
                DOMManager.renderField();
                break;
        }
    },

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

        const opponentHasMonsters = gameState.opponentMonsters.some(m => m !== null);

        if (!opponentHasMonsters) {
            this.declareDirectAttack(cardInstance);
        } else {
            gameState.selectedCard = cardInstance;
            gameState.targetingMode = true;
            cardEl.classList.add('selected');

            document.querySelectorAll('.opponent-field .monster-zone').forEach(zone => {
                if (zone.classList.contains('occupied')) {
                    zone.classList.add('targetable');
                }
            });

            Utils.showToast('Select Target', 'Click an opponent\'s monster to attack.', 'info');
        }
    },

    onFieldMonsterRightClick(cardInstance, cardEl, event) {
        if (!Utils.isPlayerTurn()) return;

        gameState.contextMenuTarget = { cardInstance, cardEl };

        const menu = DOMManager.elements.contextMenu;
        if (!menu) return;

        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.classList.remove('hidden');

        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.style.display = 'none';
        });

        if (cardInstance.faceUp) {
            const changePos = document.querySelector('[data-action="change-pos"]');
            if (changePos) changePos.style.display = '';
            if (gameState.currentPhase === CONFIG.PHASES.BATTLE) {
                const attack = document.querySelector('[data-action="attack"]');
                if (attack) attack.style.display = '';
            }
        } else {
            const flip = document.querySelector('[data-action="flip"]');
            if (flip) flip.style.display = '';
        }

        const viewCard = document.querySelector('[data-action="view-card"]');
        if (viewCard) viewCard.style.display = '';

        const cancel = document.querySelector('[data-action="cancel"]');
        if (cancel) cancel.style.display = '';
    },

    onOpponentMonsterClick(cardInstance, zoneIndex) {
        if (!gameState.targetingMode || !gameState.selectedCard) return;

        this.declareAttack(gameState.selectedCard, cardInstance, zoneIndex);
    },

    async declareAttack(attacker, defender, defenderZoneIndex) {
        gameState.targetingMode = false;
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));

        const attackerEl = document.querySelector(`[data-unique-id="${attacker.uniqueId}"]`);

        if (attackerEl) {
            attackerEl.classList.add('attack-lunge');
            setTimeout(() => attackerEl.classList.remove('attack-lunge'), 600);
        }

        DOMManager.showBattleMessage('ATTACK!', 'attack');
        Utils.playSound('sfx-attack');

        await Utils.delay(600);

        const result = Utils.calculateBattleDamage(attacker, defender, defender.position);

        if (result.damage > 0) {
            if (defender.position === 'attack') {
                await GameController.dealDamage('opponent', result.damage);
            } else {
                await GameController.dealDamage('player', result.damage);
            }
            DOMManager.screenShake('medium');
            DOMManager.impactFlash();
        }

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

        gameState.attackedThisTurn.add(attacker.uniqueId);

        DOMManager.renderField();
        DOMManager.updateDeckCounters();
        gameState.selectedCard = null;

        await Utils.delay(500);
    },

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

    onFieldSpellTrapClick(cardInstance, cardEl) {
        if (!Utils.isPlayerTurn()) return;

        if (cardInstance.type === CONFIG.CARD_TYPES.SPELL && !cardInstance.faceUp) {
            this.activateSetSpell(cardInstance);
        }
    },

    async activateSetSpell(cardInstance) {
        cardInstance.faceUp = true;

        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Yami Yugi activates ${cardInstance.name}!`, 'player');

        await this.resolveSpellEffect(cardInstance, 'player');

        gameState.playerSpellsTraps[cardInstance.zoneIndex] = null;
        gameState.playerGraveyard.push(cardInstance);
        gameState.playerGYCount++;

        DOMManager.renderField();
        DOMManager.updateDeckCounters();

        await Utils.delay(600);
    }
};

// ============================================= //
// 9. GAME CONTROLLER                            //
// ============================================= //

const GameController = {
    async init() {
        DOMManager.init();
        Utils.loadSettings();

        this.bindEventListeners();
        this.initCursorFollower();
        this.initTutorial();

        await this.runLoadingSequence();
    },

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
            if (DOMManager.elements.loadingProgress) {
                DOMManager.elements.loadingProgress.style.width = `${i}%`;
            }
            if (DOMManager.elements.loadingPercent) {
                DOMManager.elements.loadingPercent.textContent = `${i}%`;
            }

            const textIndex = Math.floor(i / 20);
            if (textIndex < loadingTexts.length && DOMManager.elements.loadingText) {
                DOMManager.elements.loadingText.textContent = loadingTexts[textIndex];
            }

            await Utils.delay(50);
        }

        await Utils.delay(500);

        if (DOMManager.elements.loadingScreen) {
            DOMManager.elements.loadingScreen.classList.remove('active');
        }
        if (DOMManager.elements.mainMenu) {
            DOMManager.elements.mainMenu.classList.add('active');
        }
    },

    async startDuel() {
        if (DOMManager.elements.mainMenu) DOMManager.elements.mainMenu.classList.remove('active');
        if (DOMManager.elements.gameContainer) DOMManager.elements.gameContainer.classList.remove('hidden');
        gameState.gameState = 'playing';

        gameState.playerDeck = Utils.shuffleArray([...PLAYER_DECK]).map(id => Utils.createCardInstance(id, 'player'));
        gameState.opponentDeck = Utils.shuffleArray([...OPPONENT_DECK]).map(id => Utils.createCardInstance(id, 'opponent'));

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

        await this.startTurn('player');
    },

    drawCard(owner) {
        const deck = owner === 'player' ? gameState.playerDeck : gameState.opponentDeck;
        const hand = owner === 'player' ? gameState.playerHand : gameState.opponentHand;

        if (deck.length === 0) {
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

    async startTurn(owner) {
        gameState.turnOwner = owner;
        gameState.normalSummonUsed = false;
        gameState.attackedThisTurn.clear();
        gameState.hasDrawnThisTurn = false;
        gameState.battlePhaseEntered = false;

        const monsters = owner === 'player' ? gameState.playerMonsters : gameState.opponentMonsters;
        monsters.forEach(card => {
            if (card) {
                card.summonedThisTurn = false;
                card.hasAttacked = false;
            }
        });

        DOMManager.updatePhaseDisplay();
        DOMManager.updateActionButtons();

        if (gameState.turnNumber > 1 || owner === 'opponent') {
            await this.goToPhase(CONFIG.PHASES.DRAW);
        } else {
            await this.goToPhase(CONFIG.PHASES.MAIN1);
        }
    },

    async goToPhase(phase) {
        gameState.currentPhase = phase;
        DOMManager.updatePhaseDisplay();
        DOMManager.updateActionButtons();

        const phaseNames = {
            [CONFIG.PHASES.DRAW]: 'DRAW PHASE',
            [CONFIG.PHASES.STANDBY]: 'STANDBY PHASE',
            [CONFIG.PHASES.MAIN1]: 'MAIN PHASE 1',
            [CONFIG.PHASES.BATTLE]: 'BATTLE PHASE',
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

    async nextPhase() {
        const phaseOrder = [
            CONFIG.PHASES.DRAW,
            CONFIG.PHASES.STANDBY,
            CONFIG.PHASES.MAIN1,
            CONFIG.PHASES.BATTLE,
            CONFIG.PHASES.END
        ];

        const currentIndex = phaseOrder.indexOf(gameState.currentPhase);

        if (currentIndex < phaseOrder.length - 1) {
            await this.goToPhase(phaseOrder[currentIndex + 1]);
        } else {
            await this.endTurn();
        }
    },

    async executeDrawPhase() {
        if (!gameState.hasDrawnThisTurn) {
            this.drawCard(gameState.turnOwner);
            gameState.hasDrawnThisTurn = true;
            Utils.playSound('sfx-draw');

            await Utils.delay(500);
            await this.goToPhase(CONFIG.PHASES.STANDBY);
        }
    },

    async executeStandbyPhase() {
        await Utils.delay(300);
        await this.goToPhase(CONFIG.PHASES.MAIN1);
    },

    async executeMainPhase() {
        if (gameState.turnOwner === 'opponent') {
            await AIOpponent.takeMainPhaseActions();
        }
    },

    async executeBattlePhase() {
        gameState.battlePhaseEntered = true;

        if (gameState.turnOwner === 'opponent') {
            await AIOpponent.takeBattlePhaseActions();
        }
    },

    async executeEndPhase() {
        await Utils.delay(300);
        await this.endTurn();
    },

    async endTurn() {
        gameState.turnNumber++;

        const nextOwner = gameState.turnOwner === 'player' ? 'opponent' : 'player';

        await this.startTurn(nextOwner);
    },

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

        const hudId = owner === 'player' ? 'player-hud' : 'opponent-hud';
        const hudEl = document.getElementById(hudId);
        DOMManager.showDamageFloater(hudEl, amount);

        Utils.logMessage(`${owner === 'player' ? 'Yami Yugi' : 'Seto Kaiba'} takes ${amount} damage!`, 'damage');
        Utils.playSound('sfx-damage');

        if (gameState.playerLP <= 0) {
            await this.endGame('opponent');
        } else if (gameState.opponentLP <= 0) {
            await this.endGame('player');
        }

        await Utils.delay(500);
    },

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

    async endGame(winner) {
        gameState.gameState = 'ended';
        gameState.winner = winner;

        const resultTitle = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');
        const resultDamage = document.getElementById('result-damage');
        const resultCards = document.getElementById('result-cards');
        const resultTurns = document.getElementById('result-turns');

        if (winner === 'player') {
            if (resultTitle) resultTitle.textContent = 'VICTORY!';
            if (resultTitle) resultTitle.className = 'result-title victory';
            if (resultSubtitle) resultSubtitle.textContent = 'You have defeated Seto Kaiba!';
            Utils.playSound('sfx-victory');
        } else {
            if (resultTitle) resultTitle.textContent = 'DEFEAT';
            if (resultTitle) resultTitle.className = 'result-title defeat';
            if (resultSubtitle) resultSubtitle.textContent = 'Seto Kaiba has defeated you...';
            Utils.playSound('sfx-defeat');
        }

        if (resultDamage) resultDamage.textContent = Utils.formatNumber(gameState.damageDealt.player);
        if (resultCards) resultCards.textContent = gameState.cardsPlayed.player;
        if (resultTurns) resultTurns.textContent = gameState.turnNumber;

        await Utils.delay(500);
        const resultOverlay = document.getElementById('result-overlay');
        if (resultOverlay) resultOverlay.classList.remove('hidden');
    },

    async rematch() {
        const resultOverlay = document.getElementById('result-overlay');
        if (resultOverlay) resultOverlay.classList.add('hidden');
        gameState.reset();
        if (DOMManager.elements.gameContainer) DOMManager.elements.gameContainer.classList.add('hidden');
        await this.startDuel();
    },

    returnToMenu() {
        const resultOverlay = document.getElementById('result-overlay');
        if (resultOverlay) resultOverlay.classList.add('hidden');
        if (DOMManager.elements.gameContainer) DOMManager.elements.gameContainer.classList.add('hidden');
        if (DOMManager.elements.mainMenu) DOMManager.elements.mainMenu.classList.add('active');
        gameState.reset();
    },

    bindEventListeners() {
        // Menu buttons
        DOMManager.elements.btnStartDuel?.addEventListener('click', () => this.startDuel());
        DOMManager.elements.btnTutorial?.addEventListener('click', () => this.showTutorial());
        DOMManager.elements.btnSettings?.addEventListener('click', () => this.showSettings());

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

        // Graveyard buttons
        DOMManager.elements.btnPlayerGY?.addEventListener('click', () => DOMManager.showGraveyard('player'));
        DOMManager.elements.btnOpponentGY?.addEventListener('click', () => DOMManager.showGraveyard('opponent'));
        DOMManager.elements.btnPlayerGYField?.addEventListener('click', () => DOMManager.showGraveyard('player'));
        DOMManager.elements.btnOpponentGYField?.addEventListener('click', () => DOMManager.showGraveyard('opponent'));
        DOMManager.elements.graveyardClose?.addEventListener('click', () => DOMManager.hideGraveyard());
        DOMManager.elements.graveyardCloseBtn?.addEventListener('click', () => DOMManager.hideGraveyard());

        // Settings
        DOMManager.elements.settingsClose?.addEventListener('click', () => {
            if (DOMManager.elements.settingsModal) DOMManager.elements.settingsModal.classList.remove('active');
        });
        DOMManager.elements.settingsSave?.addEventListener('click', () => {
            this.saveSettingsFromUI();
            if (DOMManager.elements.settingsModal) DOMManager.elements.settingsModal.classList.remove('active');
        });

        // Log toggle
        DOMManager.elements.logToggle?.addEventListener('click', () => {
            if (DOMManager.elements.logContent) DOMManager.elements.logContent.classList.toggle('collapsed');
            if (DOMManager.elements.logToggle) DOMManager.elements.logToggle.classList.toggle('collapsed');
        });

        // Context menu actions
        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                this.handleContextAction(action);
                if (DOMManager.elements.contextMenu) DOMManager.elements.contextMenu.classList.add('hidden');
            });
        });

        // Close context menu on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.context-menu-container') && !e.target.closest('.card')) {
                if (DOMManager.elements.contextMenu) DOMManager.elements.contextMenu.classList.add('hidden');
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

        // Target selector cancel
        DOMManager.elements.selectorCancel?.addEventListener('click', () => {
            gameState.selectedCard = null;
            gameState.targetingMode = false;
            document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));
            if (DOMManager.elements.targetSelector) DOMManager.elements.targetSelector.classList.add('hidden');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                if (Utils.isPlayerTurn()) this.nextPhase();
            } else if (e.key === 'Escape') {
                if (gameState.targetingMode) {
                    gameState.selectedCard = null;
                    gameState.targetingMode = false;
                    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                    document.querySelectorAll('.targetable').forEach(el => el.classList.remove('targetable'));
                }
                if (DOMManager.elements.contextMenu) DOMManager.elements.contextMenu.classList.add('hidden');
            }
        });
    },

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
                if (!cardInstance.faceUp && cardInstance.position === 'defense') {
                    cardInstance.faceUp = true;
                    cardInstance.position = 'attack';
                    DOMManager.renderMonsterOnField('player', cardInstance.zoneIndex, cardInstance);
                    DOMManager.showBattleMessage('FLIP SUMMON!', 'summon');
                    Utils.logMessage(`Yami Yugi Flip Summons ${cardInstance.name}!`, 'player');
                }
                break;

            case 'change-pos':
                if (cardInstance.faceUp) {
                    cardInstance.position = cardInstance.position === 'attack' ? 'defense' : 'attack';
                    DOMManager.renderMonsterOnField('player', cardInstance.zoneIndex, cardInstance);
                    Utils.logMessage(`${cardInstance.name} changes to ${cardInstance.position} position.`, 'player');
                }
                break;

            case 'view-card':
                CardInspector.show(cardInstance);
                break;

            case 'cancel':
                break;
        }

        gameState.contextMenuTarget = null;
    },

    initCursorFollower() {
        const follower = DOMManager.elements.cursorFollower;
        const followerInner = DOMManager.elements.cursorFollowerInner;

        if (!follower || !followerInner) return;

        // Only enable on non-touch devices
        if ('ontouchstart' in window) return;

        document.addEventListener('mousemove', (e) => {
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
            followerInner.style.left = `${e.clientX}px`;
            followerInner.style.top = `${e.clientY}px`;

            const target = e.target;
            if (target.closest('.card') || target.closest('button') || target.closest('.zone')) {
                follower.classList.add('hovering');
            } else {
                follower.classList.remove('hovering');
            }
        });
    },

    showSettings() {
        if (!DOMManager.elements.settingsModal) return;

        // Populate settings UI
        const sfxEnabled = document.getElementById('sfx-enabled');
        const musicEnabled = document.getElementById('music-enabled');
        const animationSpeed = document.getElementById('animation-speed');
        const showDamage = document.getElementById('show-damage');
        const showPhases = document.getElementById('show-phases');
        const bgEffects = document.getElementById('bg-effects');
        const particleEffects = document.getElementById('particle-effects');
        const cardGlow = document.getElementById('card-glow');

        if (sfxEnabled) sfxEnabled.checked = gameState.settings.sfxEnabled;
        if (musicEnabled) musicEnabled.checked = gameState.settings.musicEnabled;
        if (animationSpeed) animationSpeed.value = gameState.settings.animationSpeed;
        if (showDamage) showDamage.checked = gameState.settings.showDamage;
        if (showPhases) showPhases.checked = gameState.settings.showPhases;
        if (bgEffects) bgEffects.checked = gameState.settings.bgEffects;
        if (particleEffects) particleEffects.checked = gameState.settings.particleEffects;
        if (cardGlow) cardGlow.checked = gameState.settings.cardGlow;

        DOMManager.elements.settingsModal.classList.add('active');
    },

    saveSettingsFromUI() {
        const sfxEnabled = document.getElementById('sfx-enabled');
        const musicEnabled = document.getElementById('music-enabled');
        const animationSpeed = document.getElementById('animation-speed');
        const showDamage = document.getElementById('show-damage');
        const showPhases = document.getElementById('show-phases');
        const bgEffects = document.getElementById('bg-effects');
        const particleEffects = document.getElementById('particle-effects');
        const cardGlow = document.getElementById('card-glow');

        if (sfxEnabled) gameState.settings.sfxEnabled = sfxEnabled.checked;
        if (musicEnabled) gameState.settings.musicEnabled = musicEnabled.checked;
        if (animationSpeed) gameState.settings.animationSpeed = animationSpeed.value;
        if (showDamage) gameState.settings.showDamage = showDamage.checked;
        if (showPhases) gameState.settings.showPhases = showPhases.checked;
        if (bgEffects) gameState.settings.bgEffects = bgEffects.checked;
        if (particleEffects) gameState.settings.particleEffects = particleEffects.checked;
        if (cardGlow) gameState.settings.cardGlow = cardGlow.checked;

        Utils.saveSettings();
        Utils.showToast('Settings Saved', 'Your preferences have been saved.', 'success');
    },

    initTutorial() {
        this.tutorialSteps = [
            {
                title: 'Welcome to Yu-Gi-Oh! HTML Edition',
                image: '🎴',
                text: 'This is a Speed Duel format card game. You start with 4000 Life Points and 4 cards in hand. Defeat Seto Kaiba to win!'
            },
            {
                title: 'The Game Field',
                image: '🏟️',
                text: 'The field has 3 Monster Zones and 3 Spell/Trap Zones. You can only Normal Summon once per turn.'
            },
            {
                title: 'Summoning Monsters',
                image: '⚔️',
                text: 'Click a monster card in your hand to Summon it in Attack Mode. Right-click (or long-press on mobile) to Set it face-down in Defense Mode.'
            },
            {
                title: 'Spell & Trap Cards',
                image: '🪄',
                text: 'Spell cards can be activated immediately or Set face-down. Trap cards must be Set and can only be activated next turn.'
            },
            {
                title: 'Battle Phase',
                image: '💥',
                text: 'During Battle Phase, click your monsters to attack. If opponent has no monsters, you can attack directly for full damage!'
            },
            {
                title: 'Battle Calculation',
                image: '⚖️',
                text: 'ATK vs ATK: Higher wins, difference = damage. ATK vs DEF: If ATK > DEF, destroy but no damage. If ATK < DEF, you take the difference.'
            },
            {
                title: 'Winning the Duel',
                image: '🏆',
                text: 'Reduce your opponent\'s Life Points to 0 to win! Or force them to run out of cards (Deck Out).'
            },
            {
                title: 'Ready to Duel!',
                image: '🎮',
                text: 'You\'re ready to face Seto Kaiba! Use the phase buttons to progress through your turn. Good luck, Duelist!'
            }
        ];

        this.currentTutorialStep = 0;
    },

    showTutorial() {
        this.currentTutorialStep = 0;
        this.updateTutorialDisplay();
        if (DOMManager.elements.tutorialOverlay) {
            DOMManager.elements.tutorialOverlay.classList.remove('hidden');
            DOMManager.elements.tutorialOverlay.classList.add('active');
        }

        // Bind tutorial buttons
        DOMManager.elements.tutorialPrev?.addEventListener('click', () => this.prevTutorialStep());
        DOMManager.elements.tutorialNext?.addEventListener('click', () => this.nextTutorialStep());
        DOMManager.elements.tutorialSkip?.addEventListener('click', () => this.closeTutorial());
    },

    updateTutorialDisplay() {
        if (!DOMManager.elements.tutorialTitle || !DOMManager.elements.tutorialImage || !DOMManager.elements.tutorialText) return;

        const step = this.tutorialSteps[this.currentTutorialStep];
        if (!step) return;

        DOMManager.elements.tutorialTitle.textContent = step.title;
        DOMManager.elements.tutorialImage.textContent = step.image;
        DOMManager.elements.tutorialText.textContent = step.text;

        if (DOMManager.elements.tutorialStep) {
            DOMManager.elements.tutorialStep.textContent = this.currentTutorialStep + 1;
        }
        if (DOMManager.elements.tutorialTotal) {
            DOMManager.elements.tutorialTotal.textContent = this.tutorialSteps.length;
        }

        if (DOMManager.elements.tutorialPrev) {
            DOMManager.elements.tutorialPrev.disabled = this.currentTutorialStep === 0;
        }
        if (DOMManager.elements.tutorialNext) {
            DOMManager.elements.tutorialNext.textContent = this.currentTutorialStep === this.tutorialSteps.length - 1 ? 'FINISH' : 'NEXT';
        }
    },

    prevTutorialStep() {
        if (this.currentTutorialStep > 0) {
            this.currentTutorialStep--;
            this.updateTutorialDisplay();
        }
    },

    nextTutorialStep() {
        if (this.currentTutorialStep < this.tutorialSteps.length - 1) {
            this.currentTutorialStep++;
            this.updateTutorialDisplay();
        } else {
            this.closeTutorial();
        }
    },

    closeTutorial() {
        if (DOMManager.elements.tutorialOverlay) {
            DOMManager.elements.tutorialOverlay.classList.add('hidden');
            DOMManager.elements.tutorialOverlay.classList.remove('active');
        }
    }
};

// ============================================= //
// 10. AI OPPONENT (KAIBA)                       //
// ============================================= //

const AIOpponent = {
    async takeMainPhaseActions() {
        await Utils.delay(CONFIG.AI_THINK_DELAY);

        // 1. Try to activate spell cards
        await this.tryActivateSpells();

        // 2. Try to summon strongest monster
        await this.trySummonMonster();

        // 3. Set remaining cards
        await this.trySetCards();

        await Utils.delay(CONFIG.AI_ACTION_DELAY);

        await GameController.nextPhase();
    },

    async tryActivateSpells() {
        const spells = gameState.opponentHand.filter(c => c.type === CONFIG.CARD_TYPES.SPELL);

        for (const spell of spells) {
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

    async activateAISpell(cardInstance) {
        gameState.opponentHand = gameState.opponentHand.filter(c => c.uniqueId !== cardInstance.uniqueId);

        DOMManager.showBattleMessage('ACTIVATE!', 'summon');
        Utils.playSound('sfx-spell');
        Utils.logMessage(`Seto Kaiba activates ${cardInstance.name}!`, 'opponent');

        await Utils.delay(CONFIG.AI_ACTION_DELAY);

        await PlayerActions.resolveSpellEffect(cardInstance, 'opponent');

        gameState.opponentGraveyard.push(cardInstance);
        gameState.opponentGYCount++;
        DOMManager.updateDeckCounters();
        DOMManager.renderOpponentHand();

        await Utils.delay(CONFIG.AI_ACTION_DELAY);
    },

    async trySummonMonster() {
        const monsters = gameState.opponentHand
            .filter(c => c.type === CONFIG.CARD_TYPES.MONSTER)
            .sort((a, b) => (b.atk || 0) - (a.atk || 0));

        const emptyZone = gameState.opponentMonsters.findIndex(z => z === null);

        if (monsters.length > 0 && emptyZone !== -1) {
            const bestMonster = monsters[0];

            gameState.opponentHand = gameState.opponentHand.filter(c => c.uniqueId !== bestMonster.uniqueId);

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
                gameState.trapSetTurn.set(card.uniqueId, gameState.turnNumber);

                DOMManager.renderSpellTrapOnField('opponent', emptyZone, card);
                DOMManager.renderOpponentHand();

                Utils.logMessage(`Seto Kaiba sets a card.`, 'opponent');
                await Utils.delay(CONFIG.AI_ACTION_DELAY);
                break;
            }
        }
    },

    async takeBattlePhaseActions() {
        await Utils.delay(CONFIG.AI_THINK_DELAY);

        const attackableMonsters = gameState.opponentMonsters.filter(
            m => m && m.faceUp && m.position === 'attack' && !m.hasAttacked && !m.summonedThisTurn
        );

        attackableMonsters.sort((a, b) => (b.atk || 0) - (a.atk || 0));

        for (const attacker of attackableMonsters) {
            const playerMonsters = gameState.playerMonsters
                .map((m, i) => ({ card: m, index: i }))
                .filter(m => m.card !== null);

            if (playerMonsters.length === 0) {
                await this.aiDirectAttack(attacker);
            } else {
                const target = this.findBestTarget(attacker, playerMonsters);
                if (target) {
                    await this.aiAttack(attacker, target.card, target.index);
                }
            }

            await Utils.delay(CONFIG.AI_ATTACK_DELAY);

            if (gameState.gameState === 'ended') break;
        }

        await Utils.delay(CONFIG.AI_ACTION_DELAY);
        await GameController.nextPhase();
    },

    findBestTarget(attacker, playerMonsters) {
        const attackerAtk = attacker.atk || 0;

        const destroyableTargets = playerMonsters.filter(t => {
            if (t.card.position === 'attack') {
                return attackerAtk > (t.card.atk || 0);
            } else {
                return attackerAtk > (t.card.def || 0);
            }
        });

        if (destroyableTargets.length > 0) {
            return destroyableTargets.sort((a, b) => {
                const damageA = a.card.position === 'attack' ? attackerAtk - (a.card.atk || 0) : 0;
                const damageB = b.card.position === 'attack' ? attackerAtk - (b.card.atk || 0) : 0;
                return damageB - damageA;
            })[0];
        }

        return playerMonsters.sort((a, b) => {
            const valueA = a.card.position === 'attack' ? (a.card.atk || 0) : (a.card.def || 0);
            const valueB = b.card.position === 'attack' ? (b.card.atk || 0) : (b.card.def || 0);
            return valueA - valueB;
        })[0];
    },

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

        const result = Utils.calculateBattleDamage(attacker, defender, defender.position);

        if (result.damage > 0) {
            if (defender.position === 'attack') {
                await GameController.dealDamage('player', result.damage);
            } else {
                await GameController.dealDamage('opponent', result.damage);
            }
            DOMManager.screenShake('medium');
            DOMManager.impactFlash();
        }

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

document.addEventListener('DOMContentLoaded', () => {
    GameController.init();
});

document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.card')) {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ============================================= //
// 12. END OF ULTIMATE GAME ENGINE               //
// ============================================= //

console.log('%c YU-GI-OH! HTML EDITION ', 'background: linear-gradient(90deg, #ffd700, #00ffff); color: #000; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c Version 3.8 ULTIMATE - Powered by Qwen 3.8 Max ', 'color: #00ffff; font-size: 12px;');
console.log('%c All systems operational - Ready to duel! ', 'color: #ffd700; font-size: 10px;');
