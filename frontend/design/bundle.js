

/* @ds-bundle: {"format":4,"namespace":"Dotboard","components":[{"name":"Icon"},{"name":"Button"},{"name":"DisplayCard"},{"name":"Modal"},{"name":"GlyphMatrix"},{"name":"Tag"},{"name":"Divider"}]} */
(function () {
    var React = window.React;
    var h = React.createElement;

    /* Matrices 7 x 7 : '#' = point allume */
    var GLYPHS = {
        'home': ['...#...', '..###..', '.#####.', '#######', '.#...#.', '.#...#.', '.#####.'],
        'grid': ['###.###', '###.###', '###.###', '.......', '###.###', '###.###', '###.###'],
        'clock': ['..###..', '.#...#.', '#..#..#', '#..##.#', '#.....#', '.#...#.', '..###..'],
        'calendar': ['.#...#.', '#######', '#.....#', '#.#.#.#', '#.....#', '#.#.#.#', '#######'],
        'sun': ['...#...', '.#.#.#.', '..###..', '#.###.#', '..###..', '.#.#.#.', '...#...'],
        'moon': ['..####.', '.##....', '##.....', '##.....', '##.....', '.##..#.', '..####.'],
        'bolt': ['....##.', '...##..', '..##...', '.#####.', '...##..', '..##...', '.##....'],
        'wifi': ['.#####.', '#.....#', '..###..', '.#...#.', '.......', '...#...', '.......'],
        'battery': ['.......', '######.', '#.##.#.', '#.##.##', '#.##.#.', '######.', '.......'],
        'thermometer': ['..###..', '..#.#..', '..#.#..', '..#.#..', '.#####.', '.#####.', '..###..'],
        'drop': ['...#...', '..###..', '..###..', '.#####.', '#######', '#######', '.#####.'],
        'check': ['.......', '......#', '.....#.', '#...#..', '.#.#...', '..#....', '.......'],
        'close': ['#.....#', '.#...#.', '..#.#..', '...#...', '..#.#..', '.#...#.', '#.....#'],
        'plus': ['...#...', '...#...', '...#...', '#######', '...#...', '...#...', '...#...'],
        'minus': ['.......', '.......', '.......', '#######', '.......', '.......', '.......'],
        'arrow-up': ['...#...', '..###..', '.#.#.#.', '...#...', '...#...', '...#...', '...#...'],
        'arrow-down': ['...#...', '...#...', '...#...', '...#...', '.#.#.#.', '..###..', '...#...'],
        'arrow-right': ['...#...', '....#..', '.....#.', '#######', '.....#.', '....#..', '...#...'],
        'bell': ['...#...', '..###..', '.#####.', '.#####.', '.#####.', '#######', '...#...'],
        'gear': ['...#...', '.#####.', '.##.##.', '###.###', '.##.##.', '.#####.', '...#...'],
        'play': ['#......', '###....', '#####..', '#######', '#####..', '###....', '#......'],
        'pause': ['.##.##.', '.##.##.', '.##.##.', '.##.##.', '.##.##.', '.##.##.', '.##.##.'],
        'alert': ['...#...', '..#.#..', '..#.#..', '.#.#.#.', '.#.#.#.', '#.....#', '#######'],
        'chart': ['......#', '......#', '....#.#', '....#.#', '..#.#.#', '..#.#.#', '#######']
    };

    function Icon(props) {
        var rows = GLYPHS[props.name];
        if (!rows) return null;
        var size = Math.max(24, props.size || 32);
        var dots = [];
        for (var y = 0; y < 7; y++) {
            for (var x = 0; x < 7; x++) {
                if (rows[y].charAt(x) === '#') dots.push(h('circle', { key: x + '-' + y, cx: x + 0.5, cy: y + 0.5, r: 0.38 }));
            }
        }
        var labelled = !!props.label;
        return h('svg', {
            className: 'db-icon' + (props.className ? ' ' + props.className : ''),
            width: size, height: size, viewBox: '0 0 7 7', fill: 'currentColor',
            role: labelled ? 'img' : undefined,
            'aria-label': labelled ? props.label : undefined,
            'aria-hidden': labelled ? undefined : 'true',
            focusable: 'false'
        }, dots);
    }
    Icon.names = Object.keys(GLYPHS);

    function Button(props) {
        var variant = props.variant || 'secondary';
        var size = props.size || 'md';
        var iconOnly = !props.children && !!props.icon;
        var cls = ['db-btn', 'db-btn--' + variant];
        if (size === 'lg') cls.push('db-btn--lg');
        if (iconOnly) cls.push('db-btn--icon');
        if (props.tone) cls.push('db-tone-' + props.tone);
        if (props.tone || props.active) cls.push('has-mark');
        if (props.active) cls.push('is-active');
        if (props.pressed) cls.push('is-pressed');
        if (props.className) cls.push(props.className);
        return h('button', {
            type: 'button',
            className: cls.join(' '),
            disabled: props.disabled,
            onClick: props.onClick,
            'aria-pressed': props.active === undefined ? undefined : !!props.active,
            'aria-label': props['aria-label']
        },
            props.icon ? h(Icon, { name: props.icon, size: 24 }) : null,
            props.children ? h('span', null, props.children) : null
        );
    }

    function DisplayCard(props) {
        var tone = props.tone || 'default';
        var cls = ['db-card'];
        if (tone === 'danger') cls.push('db-card--danger', 'db-tone-red');
        else if (tone !== 'default') cls.push('db-tone-' + tone);
        if (props.size === 'lg') cls.push('db-card--lg');
        if (props.pressed) cls.push('is-pressed');
        if (props.className) cls.push(props.className);
        var interactive = typeof props.onPress === 'function';
        var head = h('div', { className: 'db-card__head' },
            h('span', { className: 'db-card__label' }, tone !== 'default' ? h('i', { className: 'db-mark', 'aria-hidden': 'true' }) : null, props.label),
            props.status
                ? h('span', { className: 'db-card__status' }, props.status)
                : (props.icon ? h(Icon, { name: props.icon, size: 32 }) : null)
        );
        var middle = props.children
            ? h('div', { className: 'db-card__body' }, props.children)
            : h('div', { className: 'db-card__value' }, props.value, props.unit ? h('span', { className: 'db-card__unit' }, props.unit) : null);
        var foot = (props.caption || interactive)
            ? h('div', { className: 'db-card__foot' }, h('span', null, props.caption), interactive ? h(Icon, { name: 'arrow-right', size: 24 }) : null)
            : null;
        var common = { className: cls.join(' '), style: props.style };
        if (interactive) {
            return h('button', Object.assign({ type: 'button', onClick: props.onPress }, common), head, middle, foot);
        }
        return h('div', common, head, middle, foot);
    }

    function Tag(props) {
        var cls = ['db-tag'];
        if (props.tone) cls.push('db-tone-' + props.tone);
        if (props.className) cls.push(props.className);
        return h('span', { className: cls.join(' ') }, props.tone === 'none' ? null : h('i', { className: 'db-mark', 'aria-hidden': 'true' }), props.children);
    }

    function Divider(props) {
        var n = Math.max(1, props.count || 1);
        var marks = [];
        for (var i = 0; i < n; i++) marks.push(h('i', { key: i, className: 'db-mark', 'aria-hidden': 'true' }));
        var cls = ['db-divider'];
        if (props.tone) cls.push('db-tone-' + props.tone);
        return h('div', { className: cls.join(' '), role: 'separator' }, marks);
    }

    var modalCounter = 0;
    function Modal(props) {
        var open = props.open !== false;
        var idRef = React.useRef(null);
        if (idRef.current === null) { modalCounter += 1; idRef.current = 'db-modal-title-' + modalCounter; }
        var panelRef = React.useRef(null);
        React.useEffect(function () {
            if (!open) return undefined;
            if (panelRef.current && !props.contained) panelRef.current.focus();
            function onKey(e) { if (e.key === 'Escape' && props.onClose) props.onClose(); }
            document.addEventListener('keydown', onKey);
            return function () { document.removeEventListener('keydown', onKey); };
        }, [open]);
        if (!open) return null;
        return h('div', {
            className: 'db-scrim' + (props.contained ? ' is-contained' : ''),
            onClick: function (e) { if (e.target === e.currentTarget && props.onClose) props.onClose(); }
        },
            h('div', { className: 'db-modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': idRef.current, tabIndex: -1, ref: panelRef },
                h('header', { className: 'db-modal__head' },
                    h('h2', { id: idRef.current, className: 'db-modal__title' + (props.tone ? ' db-tone-' + props.tone : '') }, props.tone ? h('i', { className: 'db-mark', 'aria-hidden': 'true' }) : null, props.title),
                    h(Button, { variant: 'ghost', size: 'lg', icon: 'close', 'aria-label': 'Fermer', onClick: props.onClose })
                ),
                h('div', { className: 'db-modal__body' }, props.children),
                props.actions ? h('footer', { className: 'db-modal__foot' }, props.actions) : null
            )
        );
    }

    function GlyphMatrix(props) {
        var N = props.cells || 21;
        var size = props.size || 128;
        var value = Math.max(0, Math.min(100, props.value == null ? 100 : props.value));
        var c = (N - 1) / 2;
        var limit = (N / 2 - 0.5) * (N / 2 - 0.5);
        var litFrom = N * (1 - value / 100);
        var dots = [];
        for (var y = 0; y < N; y++) {
            for (var x = 0; x < N; x++) {
                var dx = x - c, dy = y - c;
                if (dx * dx + dy * dy > limit) continue;
                var lit = (y + 0.5) >= litFrom;
                dots.push(h('circle', { key: x + '-' + y, cx: x + 0.5, cy: y + 0.5, r: 0.34, style: { fill: lit ? 'currentColor' : 'var(--glyph-off, var(--surface-3))' } }));
            }
        }
        return h('svg', {
            className: 'db-glyph' + (props.className ? ' ' + props.className : ''),
            width: size, height: size, viewBox: '0 0 ' + N + ' ' + N,
            role: 'img', 'aria-label': props.label || (Math.round(value) + ' %')
        }, dots);
    }

    var root = window;
    root.Dotboard = root.Dotboard || {};
    Object.assign(root.Dotboard, { Icon: Icon, Button: Button, DisplayCard: DisplayCard, Modal: Modal, GlyphMatrix: GlyphMatrix, Tag: Tag, Divider: Divider });
})();

