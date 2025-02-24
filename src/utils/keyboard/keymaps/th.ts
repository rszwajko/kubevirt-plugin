import { KeyMap } from '../types';

/**
 * Converted to TS from: https://github.com/qemu/qemu/blob/b69801dd6b1eb4d107f7c2f643adf0a4e3ec9124/pc-bios/keymaps/th
 * cat input | sed -E "/^[^#]/s/\s+/', '/g" | sed -E "/^[^#]/s/^(.+)$/['\1'],/" | sed -E "/^[^#]/s/('(0x\w+)')/\2/"| sed -E "s/^#/\/\//" > output
 */
const keymap: KeyMap = [
  //
  // generated by qemu-keymap
  //    model   : pc105
  //    layout  : th
  //    variant : -
  //    options : -

  // name: "Thai"

  // modifiers
  //     0: Shift
  //     1: Lock
  //     2: Control
  //     3: Mod1
  //     4: Mod2
  //     5: Mod3
  //     6: Mod4
  //     7: Mod5
  //     8: NumLock
  //     9: Alt
  //    10: LevelThree
  //    11: LAlt
  //    12: RAlt
  //    13: RControl
  //    14: LControl
  //    15: ScrollLock
  //    16: LevelFive
  //    17: AltGr
  //    18: Meta
  //    19: Super
  //    20: Hyper

  // evdev 1 (0x1), QKeyCode "esc", number 0x1
  ['Escape', 0x01],

  // evdev 2 (0x2), QKeyCode "1", number 0x2
  ['Thai_lakkhangyao', 0x02],
  ['plus', 0x02, 'shift'],

  // evdev 3 (0x3), QKeyCode "2", number 0x3
  ['slash', 0x03],
  ['Thai_leknung', 0x03, 'shift'],

  // evdev 4 (0x4), QKeyCode "3", number 0x4
  ['minus', 0x04],
  ['Thai_leksong', 0x04, 'shift'],

  // evdev 5 (0x5), QKeyCode "4", number 0x5
  ['Thai_phosamphao', 0x05],
  ['Thai_leksam', 0x05, 'shift'],

  // evdev 6 (0x6), QKeyCode "5", number 0x6
  ['Thai_thothung', 0x06],
  ['Thai_leksi', 0x06, 'shift'],

  // evdev 7 (0x7), QKeyCode "6", number 0x7
  ['Thai_sarau', 0x07],
  ['Thai_sarauu', 0x07, 'shift'],

  // evdev 8 (0x8), QKeyCode "7", number 0x8
  ['Thai_saraue', 0x08],
  ['Thai_baht', 0x08, 'shift'],

  // evdev 9 (0x9), QKeyCode "8", number 0x9
  ['Thai_khokhwai', 0x09],
  ['Thai_lekha', 0x09, 'shift'],

  // evdev 10 (0xa), QKeyCode "9", number 0xa
  ['Thai_totao', 0x0a],
  ['Thai_lekhok', 0x0a, 'shift'],

  // evdev 11 (0xb), QKeyCode "0", number 0xb
  ['Thai_chochan', 0x0b],
  ['Thai_lekchet', 0x0b, 'shift'],

  // evdev 12 (0xc), QKeyCode "minus", number 0xc
  ['Thai_khokhai', 0x0c],
  ['Thai_lekpaet', 0x0c, 'shift'],

  // evdev 13 (0xd), QKeyCode "equal", number 0xd
  ['Thai_chochang', 0x0d],
  ['Thai_lekkao', 0x0d, 'shift'],

  // evdev 14 (0xe), QKeyCode "backspace", number 0xe
  ['BackSpace', 0x0e],

  // evdev 15 (0xf), QKeyCode "tab", number 0xf
  ['Tab', 0x0f],
  ['ISO_Left_Tab', 0x0f, 'shift'],

  // evdev 16 (0x10), QKeyCode "q", number 0x10
  ['Thai_maiyamok', 0x10],
  ['Thai_leksun', 0x10, 'shift'],

  // evdev 17 (0x11), QKeyCode "w", number 0x11
  ['Thai_saraaimaimalai', 0x11],
  ['quotedbl', 0x11, 'shift'],

  // evdev 18 (0x12), QKeyCode "e", number 0x12
  ['Thai_saraam', 0x12],
  ['Thai_dochada', 0x12, 'shift'],

  // evdev 19 (0x13), QKeyCode "r", number 0x13
  ['Thai_phophan', 0x13],
  ['Thai_thonangmontho', 0x13, 'shift'],

  // evdev 20 (0x14), QKeyCode "t", number 0x14
  ['Thai_saraa', 0x14],
  ['Thai_thothong', 0x14, 'shift'],

  // evdev 21 (0x15), QKeyCode "y", number 0x15
  ['Thai_maihanakat', 0x15],
  ['Thai_nikhahit', 0x15, 'shift'],

  // evdev 22 (0x16), QKeyCode "u", number 0x16
  ['Thai_saraii', 0x16],
  ['Thai_maitri', 0x16, 'shift'],

  // evdev 23 (0x17), QKeyCode "i", number 0x17
  ['Thai_rorua', 0x17],
  ['Thai_nonen', 0x17, 'shift'],

  // evdev 24 (0x18), QKeyCode "o", number 0x18
  ['Thai_nonu', 0x18],
  ['Thai_paiyannoi', 0x18, 'shift'],

  // evdev 25 (0x19), QKeyCode "p", number 0x19
  ['Thai_yoyak', 0x19],
  ['Thai_yoying', 0x19, 'shift'],

  // evdev 26 (0x1a), QKeyCode "bracket_left", number 0x1a
  ['Thai_bobaimai', 0x1a],
  ['Thai_thothan', 0x1a, 'shift'],

  // evdev 27 (0x1b), QKeyCode "bracket_right", number 0x1b
  ['Thai_loling', 0x1b],
  ['comma', 0x1b, 'shift'],

  // evdev 28 (0x1c), QKeyCode "ret", number 0x1c
  ['Return', 0x1c],

  // evdev 29 (0x1d), QKeyCode "ctrl", number 0x1d
  ['Control_L', 0x1d],

  // evdev 30 (0x1e), QKeyCode "a", number 0x1e
  ['Thai_fofan', 0x1e],
  ['Thai_ru', 0x1e, 'shift'],

  // evdev 31 (0x1f), QKeyCode "s", number 0x1f
  ['Thai_hohip', 0x1f],
  ['Thai_khorakhang', 0x1f, 'shift'],

  // evdev 32 (0x20), QKeyCode "d", number 0x20
  ['Thai_kokai', 0x20],
  ['Thai_topatak', 0x20, 'shift'],

  // evdev 33 (0x21), QKeyCode "f", number 0x21
  ['Thai_dodek', 0x21],
  ['Thai_sarao', 0x21, 'shift'],

  // evdev 34 (0x22), QKeyCode "g", number 0x22
  ['Thai_sarae', 0x22],
  ['Thai_chochoe', 0x22, 'shift'],

  // evdev 35 (0x23), QKeyCode "h", number 0x23
  ['Thai_maitho', 0x23],
  ['Thai_maitaikhu', 0x23, 'shift'],

  // evdev 36 (0x24), QKeyCode "j", number 0x24
  ['Thai_maiek', 0x24],
  ['Thai_maichattawa', 0x24, 'shift'],

  // evdev 37 (0x25), QKeyCode "k", number 0x25
  ['Thai_saraaa', 0x25],
  ['Thai_sorusi', 0x25, 'shift'],

  // evdev 38 (0x26), QKeyCode "l", number 0x26
  ['Thai_sosua', 0x26],
  ['Thai_sosala', 0x26, 'shift'],

  // evdev 39 (0x27), QKeyCode "semicolon", number 0x27
  ['Thai_wowaen', 0x27],
  ['Thai_soso', 0x27, 'shift'],

  // evdev 40 (0x28), QKeyCode "apostrophe", number 0x28
  ['Thai_ngongu', 0x28],
  ['period', 0x28, 'shift'],

  // evdev 41 (0x29), QKeyCode "grave_accent", number 0x29
  ['underscore', 0x29],
  ['percent', 0x29, 'shift'],

  // evdev 42 (0x2a), QKeyCode "shift", number 0x2a
  ['Shift_L', 0x2a],

  // evdev 43 (0x2b), QKeyCode "backslash", number 0x2b
  ['Thai_khokhuat', 0x2b],
  ['Thai_khokhon', 0x2b, 'shift'],

  // evdev 44 (0x2c), QKeyCode "z", number 0x2c
  ['Thai_phophung', 0x2c],
  ['parenleft', 0x2c, 'shift'],

  // evdev 45 (0x2d), QKeyCode "x", number 0x2d
  ['Thai_popla', 0x2d],
  ['parenright', 0x2d, 'shift'],

  // evdev 46 (0x2e), QKeyCode "c", number 0x2e
  ['Thai_saraae', 0x2e],
  ['Thai_choching', 0x2e, 'shift'],

  // evdev 47 (0x2f), QKeyCode "v", number 0x2f
  ['Thai_oang', 0x2f],
  ['Thai_honokhuk', 0x2f, 'shift'],

  // evdev 48 (0x30), QKeyCode "b", number 0x30
  ['Thai_sarai', 0x30],
  ['Thai_phinthu', 0x30, 'shift'],

  // evdev 49 (0x31), QKeyCode "n", number 0x31
  ['Thai_sarauee', 0x31],
  ['Thai_thanthakhat', 0x31, 'shift'],

  // evdev 50 (0x32), QKeyCode "m", number 0x32
  ['Thai_thothahan', 0x32],
  ['question', 0x32, 'shift'],

  // evdev 51 (0x33), QKeyCode "comma", number 0x33
  ['Thai_moma', 0x33],
  ['Thai_thophuthao', 0x33, 'shift'],

  // evdev 52 (0x34), QKeyCode "dot", number 0x34
  ['Thai_saraaimaimuan', 0x34],
  ['Thai_lochula', 0x34, 'shift'],

  // evdev 53 (0x35), QKeyCode "slash", number 0x35
  ['Thai_fofa', 0x35],
  ['Thai_lu', 0x35, 'shift'],

  // evdev 54 (0x36), QKeyCode "shift_r", number 0x36
  ['Shift_R', 0x36],

  // evdev 55 (0x37), QKeyCode "kp_multiply", number 0x37
  ['KP_Multiply', 0x37],

  // evdev 56 (0x38), QKeyCode "alt", number 0x38
  ['Alt_L', 0x38],
  ['Meta_L', 0x38, 'shift'],

  // evdev 57 (0x39), QKeyCode "spc", number 0x39
  ['space', 0x39],

  // evdev 58 (0x3a), QKeyCode "caps_lock", number 0x3a
  ['Caps_Lock', 0x3a],

  // evdev 59 (0x3b), QKeyCode "f1", number 0x3b
  ['F1', 0x3b],

  // evdev 60 (0x3c), QKeyCode "f2", number 0x3c
  ['F2', 0x3c],

  // evdev 61 (0x3d), QKeyCode "f3", number 0x3d
  ['F3', 0x3d],

  // evdev 62 (0x3e), QKeyCode "f4", number 0x3e
  ['F4', 0x3e],

  // evdev 63 (0x3f), QKeyCode "f5", number 0x3f
  ['F5', 0x3f],

  // evdev 64 (0x40), QKeyCode "f6", number 0x40
  ['F6', 0x40],

  // evdev 65 (0x41), QKeyCode "f7", number 0x41
  ['F7', 0x41],

  // evdev 66 (0x42), QKeyCode "f8", number 0x42
  ['F8', 0x42],

  // evdev 67 (0x43), QKeyCode "f9", number 0x43
  ['F9', 0x43],

  // evdev 68 (0x44), QKeyCode "f10", number 0x44
  ['F10', 0x44],

  // evdev 69 (0x45), QKeyCode "num_lock", number 0x45
  ['Num_Lock', 0x45],

  // evdev 70 (0x46), QKeyCode "scroll_lock", number 0x46
  ['Scroll_Lock', 0x46],

  // evdev 71 (0x47), QKeyCode "kp_7", number 0x47
  ['KP_Home', 0x47],
  ['KP_7', 0x47, 'numlock'],

  // evdev 72 (0x48), QKeyCode "kp_8", number 0x48
  ['KP_Up', 0x48],
  ['KP_8', 0x48, 'numlock'],

  // evdev 73 (0x49), QKeyCode "kp_9", number 0x49
  ['KP_Prior', 0x49],
  ['KP_9', 0x49, 'numlock'],

  // evdev 74 (0x4a), QKeyCode "kp_subtract", number 0x4a
  ['KP_Subtract', 0x4a],

  // evdev 75 (0x4b), QKeyCode "kp_4", number 0x4b
  ['KP_Left', 0x4b],
  ['KP_4', 0x4b, 'numlock'],

  // evdev 76 (0x4c), QKeyCode "kp_5", number 0x4c
  ['KP_Begin', 0x4c],
  ['KP_5', 0x4c, 'numlock'],

  // evdev 77 (0x4d), QKeyCode "kp_6", number 0x4d
  ['KP_Right', 0x4d],
  ['KP_6', 0x4d, 'numlock'],

  // evdev 78 (0x4e), QKeyCode "kp_add", number 0x4e
  ['KP_Add', 0x4e],

  // evdev 79 (0x4f), QKeyCode "kp_1", number 0x4f
  ['KP_End', 0x4f],
  ['KP_1', 0x4f, 'numlock'],

  // evdev 80 (0x50), QKeyCode "kp_2", number 0x50
  ['KP_Down', 0x50],
  ['KP_2', 0x50, 'numlock'],

  // evdev 81 (0x51), QKeyCode "kp_3", number 0x51
  ['KP_Next', 0x51],
  ['KP_3', 0x51, 'numlock'],

  // evdev 82 (0x52), QKeyCode "kp_0", number 0x52
  ['KP_Insert', 0x52],
  ['KP_0', 0x52, 'numlock'],

  // evdev 83 (0x53), QKeyCode "kp_decimal", number 0x53
  ['KP_Delete', 0x53],
  ['KP_Decimal', 0x53, 'numlock'],

  // evdev 84 (0x54): no evdev -> QKeyCode mapping (xkb keysym ISO_Level3_Shift)

  // evdev 85 (0x55): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 86 (0x56), QKeyCode "less", number 0x56
  ['less', 0x56],
  ['greater', 0x56, 'shift'],
  ['bar', 0x56, 'altgr'],
  ['brokenbar', 0x56, 'shift', 'altgr'],

  // evdev 87 (0x57), QKeyCode "f11", number 0x57
  ['F11', 0x57],

  // evdev 88 (0x58), QKeyCode "f12", number 0x58
  ['F12', 0x58],

  // evdev 89 (0x59), QKeyCode "ro", number 0x73

  // evdev 90 (0x5a): no evdev -> QKeyCode mapping (xkb keysym Katakana)

  // evdev 91 (0x5b), QKeyCode "hiragana", number 0x77
  ['Hiragana', 0x77],

  // evdev 92 (0x5c), QKeyCode "henkan", number 0x79
  ['Henkan_Mode', 0x79],

  // evdev 93 (0x5d), QKeyCode "katakanahiragana", number 0x70
  ['Hiragana_Katakana', 0x70],

  // evdev 94 (0x5e), QKeyCode "muhenkan", number 0x7b
  ['Muhenkan', 0x7b],

  // evdev 95 (0x5f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 96 (0x60), QKeyCode "kp_enter", number 0x9c
  ['KP_Enter', 0x9c],

  // evdev 97 (0x61), QKeyCode "ctrl_r", number 0x9d
  ['Control_R', 0x9d],

  // evdev 98 (0x62), QKeyCode "kp_divide", number 0xb5
  ['KP_Divide', 0xb5],

  // evdev 99 (0x63), QKeyCode "sysrq", number 0x54
  ['Print', 0x54],

  // evdev 100 (0x64), QKeyCode "alt_r", number 0xb8
  ['Alt_R', 0xb8],
  ['Meta_R', 0xb8, 'shift'],

  // evdev 101 (0x65), QKeyCode "lf", number 0x5b
  ['Linefeed', 0x5b],

  // evdev 102 (0x66), QKeyCode "home", number 0xc7
  ['Home', 0xc7],

  // evdev 103 (0x67), QKeyCode "up", number 0xc8
  ['Up', 0xc8],

  // evdev 104 (0x68), QKeyCode "pgup", number 0xc9
  ['Prior', 0xc9],

  // evdev 105 (0x69), QKeyCode "left", number 0xcb
  ['Left', 0xcb],

  // evdev 106 (0x6a), QKeyCode "right", number 0xcd
  ['Right', 0xcd],

  // evdev 107 (0x6b), QKeyCode "end", number 0xcf
  ['End', 0xcf],

  // evdev 108 (0x6c), QKeyCode "down", number 0xd0
  ['Down', 0xd0],

  // evdev 109 (0x6d), QKeyCode "pgdn", number 0xd1
  ['Next', 0xd1],

  // evdev 110 (0x6e), QKeyCode "insert", number 0xd2
  ['Insert', 0xd2],

  // evdev 111 (0x6f), QKeyCode "delete", number 0xd3
  ['Delete', 0xd3],

  // evdev 112 (0x70): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 113 (0x71), QKeyCode "audiomute", number 0xa0
  ['XF86AudioMute', 0xa0],

  // evdev 114 (0x72), QKeyCode "volumedown", number 0xae
  ['XF86AudioLowerVolume', 0xae],

  // evdev 115 (0x73), QKeyCode "volumeup", number 0xb0
  ['XF86AudioRaiseVolume', 0xb0],

  // evdev 116 (0x74), QKeyCode "power", number 0xde
  ['XF86PowerOff', 0xde],

  // evdev 117 (0x75), QKeyCode "kp_equals", number 0x59
  ['KP_Equal', 0x59],

  // evdev 118 (0x76): no evdev -> QKeyCode mapping (xkb keysym plusminus)

  // evdev 119 (0x77), QKeyCode "pause", number 0xc6
  ['Pause', 0xc6],

  // evdev 120 (0x78): no evdev -> QKeyCode mapping (xkb keysym XF86LaunchA)

  // evdev 121 (0x79), QKeyCode "kp_comma", number 0x7e
  ['KP_Decimal', 0x7e],

  // evdev 122 (0x7a): no evdev -> QKeyCode mapping (xkb keysym Hangul)

  // evdev 123 (0x7b): no evdev -> QKeyCode mapping (xkb keysym Hangul_Hanja)

  // evdev 124 (0x7c), QKeyCode "yen", number 0x7d

  // evdev 125 (0x7d), QKeyCode "meta_l", number 0xdb
  ['Super_L', 0xdb],

  // evdev 126 (0x7e), QKeyCode "meta_r", number 0xdc
  ['Super_R', 0xdc],

  // evdev 127 (0x7f), QKeyCode "compose", number 0xdd
  ['Menu', 0xdd],

  // evdev 128 (0x80), QKeyCode "stop", number 0xe8
  ['Cancel', 0xe8],

  // evdev 129 (0x81), QKeyCode "again", number 0x85
  ['Redo', 0x85],

  // evdev 130 (0x82), QKeyCode "props", number 0x86
  ['SunProps', 0x86],

  // evdev 131 (0x83), QKeyCode "undo", number 0x87
  ['Undo', 0x87],

  // evdev 132 (0x84), QKeyCode "front", number 0x8c
  ['SunFront', 0x8c],

  // evdev 133 (0x85), QKeyCode "copy", number 0xf8
  ['XF86Copy', 0xf8],

  // evdev 134 (0x86), QKeyCode "open", number 0x64
  ['XF86Open', 0x64],

  // evdev 135 (0x87), QKeyCode "paste", number 0x65
  ['XF86Paste', 0x65],

  // evdev 136 (0x88), QKeyCode "find", number 0xc1
  ['Find', 0xc1],

  // evdev 137 (0x89), QKeyCode "cut", number 0xbc
  ['XF86Cut', 0xbc],

  // evdev 138 (0x8a), QKeyCode "help", number 0xf5
  ['Help', 0xf5],

  // evdev 139 (0x8b), QKeyCode "menu", number 0x9e
  ['XF86MenuKB', 0x9e],

  // evdev 140 (0x8c), QKeyCode "calculator", number 0xa1
  ['XF86Calculator', 0xa1],

  // evdev 141 (0x8d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 142 (0x8e), QKeyCode "sleep", number 0xdf
  ['XF86Sleep', 0xdf],

  // evdev 143 (0x8f), QKeyCode "wake", number 0xe3
  ['XF86WakeUp', 0xe3],

  // evdev 144 (0x90): no evdev -> QKeyCode mapping (xkb keysym XF86Explorer)

  // evdev 145 (0x91): no evdev -> QKeyCode mapping (xkb keysym XF86Send)

  // evdev 146 (0x92): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 147 (0x93): no evdev -> QKeyCode mapping (xkb keysym XF86Xfer)

  // evdev 148 (0x94): no evdev -> QKeyCode mapping (xkb keysym XF86Launch1)

  // evdev 149 (0x95): no evdev -> QKeyCode mapping (xkb keysym XF86Launch2)

  // evdev 150 (0x96): no evdev -> QKeyCode mapping (xkb keysym XF86WWW)

  // evdev 151 (0x97): no evdev -> QKeyCode mapping (xkb keysym XF86DOS)

  // evdev 152 (0x98): no evdev -> QKeyCode mapping (xkb keysym XF86ScreenSaver)

  // evdev 153 (0x99): no evdev -> QKeyCode mapping (xkb keysym XF86RotateWindows)

  // evdev 154 (0x9a): no evdev -> QKeyCode mapping (xkb keysym XF86TaskPane)

  // evdev 155 (0x9b), QKeyCode "mail", number 0xec
  ['XF86Mail', 0xec],

  // evdev 156 (0x9c), QKeyCode "ac_bookmarks", number 0xe6
  ['XF86Favorites', 0xe6],

  // evdev 157 (0x9d), QKeyCode "computer", number 0xeb
  ['XF86MyComputer', 0xeb],

  // evdev 158 (0x9e), QKeyCode "ac_back", number 0xea
  ['XF86Back', 0xea],

  // evdev 159 (0x9f), QKeyCode "ac_forward", number 0xe9
  ['XF86Forward', 0xe9],

  // evdev 160 (0xa0): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 161 (0xa1): no evdev -> QKeyCode mapping (xkb keysym XF86Eject)

  // evdev 162 (0xa2): no evdev -> QKeyCode mapping (xkb keysym XF86Eject)

  // evdev 163 (0xa3), QKeyCode "audionext", number 0x99
  ['XF86AudioNext', 0x99],

  // evdev 164 (0xa4), QKeyCode "audioplay", number 0xa2
  ['XF86AudioPlay', 0xa2],
  ['XF86AudioPause', 0xa2, 'shift'],

  // evdev 165 (0xa5), QKeyCode "audioprev", number 0x90
  ['XF86AudioPrev', 0x90],

  // evdev 166 (0xa6), QKeyCode "audiostop", number 0xa4
  ['XF86AudioStop', 0xa4],
  ['XF86Eject', 0xa4, 'shift'],

  // evdev 167 (0xa7): no evdev -> QKeyCode mapping (xkb keysym XF86AudioRecord)

  // evdev 168 (0xa8): no evdev -> QKeyCode mapping (xkb keysym XF86AudioRewind)

  // evdev 169 (0xa9): no evdev -> QKeyCode mapping (xkb keysym XF86Phone)

  // evdev 170 (0xaa): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 171 (0xab): no evdev -> QKeyCode mapping (xkb keysym XF86Tools)

  // evdev 172 (0xac), QKeyCode "ac_home", number 0xb2
  ['XF86HomePage', 0xb2],

  // evdev 173 (0xad), QKeyCode "ac_refresh", number 0xe7
  ['XF86Reload', 0xe7],

  // evdev 174 (0xae): no evdev -> QKeyCode mapping (xkb keysym XF86Close)

  // evdev 175 (0xaf): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 176 (0xb0): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 177 (0xb1): no evdev -> QKeyCode mapping (xkb keysym XF86ScrollUp)

  // evdev 178 (0xb2): no evdev -> QKeyCode mapping (xkb keysym XF86ScrollDown)

  // evdev 179 (0xb3): no evdev -> QKeyCode mapping (xkb keysym parenleft)

  // evdev 180 (0xb4): no evdev -> QKeyCode mapping (xkb keysym parenright)

  // evdev 181 (0xb5): no evdev -> QKeyCode mapping (xkb keysym XF86New)

  // evdev 182 (0xb6): no evdev -> QKeyCode mapping (xkb keysym Redo)

  // evdev 183 (0xb7): no evdev -> QKeyCode mapping (xkb keysym XF86Tools)

  // evdev 184 (0xb8): no evdev -> QKeyCode mapping (xkb keysym XF86Launch5)

  // evdev 185 (0xb9): no evdev -> QKeyCode mapping (xkb keysym XF86Launch6)

  // evdev 186 (0xba): no evdev -> QKeyCode mapping (xkb keysym XF86Launch7)

  // evdev 187 (0xbb): no evdev -> QKeyCode mapping (xkb keysym XF86Launch8)

  // evdev 188 (0xbc): no evdev -> QKeyCode mapping (xkb keysym XF86Launch9)

  // evdev 189 (0xbd): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 190 (0xbe): no evdev -> QKeyCode mapping (xkb keysym XF86AudioMicMute)

  // evdev 191 (0xbf): no evdev -> QKeyCode mapping (xkb keysym XF86TouchpadToggle)

  // evdev 192 (0xc0): no evdev -> QKeyCode mapping (xkb keysym XF86TouchpadOn)

  // evdev 193 (0xc1): no evdev -> QKeyCode mapping (xkb keysym XF86TouchpadOff)

  // evdev 194 (0xc2): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 195 (0xc3): no evdev -> QKeyCode mapping (xkb keysym Mode_switch)

  // evdev 196 (0xc4): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 197 (0xc5): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 198 (0xc6): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 199 (0xc7): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 200 (0xc8): no evdev -> QKeyCode mapping (xkb keysym XF86AudioPlay)

  // evdev 201 (0xc9): no evdev -> QKeyCode mapping (xkb keysym XF86AudioPause)

  // evdev 202 (0xca): no evdev -> QKeyCode mapping (xkb keysym XF86Launch3)

  // evdev 203 (0xcb): no evdev -> QKeyCode mapping (xkb keysym XF86Launch4)

  // evdev 204 (0xcc): no evdev -> QKeyCode mapping (xkb keysym XF86LaunchB)

  // evdev 205 (0xcd): no evdev -> QKeyCode mapping (xkb keysym XF86Suspend)

  // evdev 206 (0xce): no evdev -> QKeyCode mapping (xkb keysym XF86Close)

  // evdev 207 (0xcf): no evdev -> QKeyCode mapping (xkb keysym XF86AudioPlay)

  // evdev 208 (0xd0): no evdev -> QKeyCode mapping (xkb keysym XF86AudioForward)

  // evdev 209 (0xd1): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 210 (0xd2): no evdev -> QKeyCode mapping (xkb keysym Print)

  // evdev 211 (0xd3): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 212 (0xd4): no evdev -> QKeyCode mapping (xkb keysym XF86WebCam)

  // evdev 213 (0xd5): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 214 (0xd6): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 215 (0xd7): no evdev -> QKeyCode mapping (xkb keysym XF86Mail)

  // evdev 216 (0xd8): no evdev -> QKeyCode mapping (xkb keysym XF86Messenger)

  // evdev 217 (0xd9): no evdev -> QKeyCode mapping (xkb keysym XF86Search)

  // evdev 218 (0xda): no evdev -> QKeyCode mapping (xkb keysym XF86Go)

  // evdev 219 (0xdb): no evdev -> QKeyCode mapping (xkb keysym XF86Finance)

  // evdev 220 (0xdc): no evdev -> QKeyCode mapping (xkb keysym XF86Game)

  // evdev 221 (0xdd): no evdev -> QKeyCode mapping (xkb keysym XF86Shop)

  // evdev 222 (0xde): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 223 (0xdf): no evdev -> QKeyCode mapping (xkb keysym Cancel)

  // evdev 224 (0xe0): no evdev -> QKeyCode mapping (xkb keysym XF86MonBrightnessDown)

  // evdev 225 (0xe1): no evdev -> QKeyCode mapping (xkb keysym XF86MonBrightnessUp)

  // evdev 226 (0xe2), QKeyCode "mediaselect", number 0xed
  ['XF86AudioMedia', 0xed],

  // evdev 227 (0xe3): no evdev -> QKeyCode mapping (xkb keysym XF86Display)

  // evdev 228 (0xe4): no evdev -> QKeyCode mapping (xkb keysym XF86KbdLightOnOff)

  // evdev 229 (0xe5): no evdev -> QKeyCode mapping (xkb keysym XF86KbdBrightnessDown)

  // evdev 230 (0xe6): no evdev -> QKeyCode mapping (xkb keysym XF86KbdBrightnessUp)

  // evdev 231 (0xe7): no evdev -> QKeyCode mapping (xkb keysym XF86Send)

  // evdev 232 (0xe8): no evdev -> QKeyCode mapping (xkb keysym XF86Reply)

  // evdev 233 (0xe9): no evdev -> QKeyCode mapping (xkb keysym XF86MailForward)

  // evdev 234 (0xea): no evdev -> QKeyCode mapping (xkb keysym XF86Save)

  // evdev 235 (0xeb): no evdev -> QKeyCode mapping (xkb keysym XF86Documents)

  // evdev 236 (0xec): no evdev -> QKeyCode mapping (xkb keysym XF86Battery)

  // evdev 237 (0xed): no evdev -> QKeyCode mapping (xkb keysym XF86Bluetooth)

  // evdev 238 (0xee): no evdev -> QKeyCode mapping (xkb keysym XF86WLAN)

  // evdev 239 (0xef): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 240 (0xf0): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 241 (0xf1): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 242 (0xf2): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 243 (0xf3): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 244 (0xf4): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 245 (0xf5): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 246 (0xf6): no evdev -> QKeyCode mapping (xkb keysym XF86WWAN)

  // evdev 247 (0xf7): no evdev -> QKeyCode mapping (xkb keysym XF86RFKill)

  // evdev 248 (0xf8): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 249 (0xf9): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 250 (0xfa): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 251 (0xfb): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 252 (0xfc): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 253 (0xfd): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 254 (0xfe): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 255 (0xff): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 256 (0x100): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 257 (0x101): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 258 (0x102): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 259 (0x103): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 260 (0x104): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 261 (0x105): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 262 (0x106): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 263 (0x107): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 264 (0x108): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 265 (0x109): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 266 (0x10a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 267 (0x10b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 268 (0x10c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 269 (0x10d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 270 (0x10e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 271 (0x10f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 272 (0x110): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 273 (0x111): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 274 (0x112): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 275 (0x113): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 276 (0x114): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 277 (0x115): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 278 (0x116): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 279 (0x117): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 280 (0x118): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 281 (0x119): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 282 (0x11a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 283 (0x11b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 284 (0x11c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 285 (0x11d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 286 (0x11e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 287 (0x11f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 288 (0x120): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 289 (0x121): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 290 (0x122): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 291 (0x123): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 292 (0x124): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 293 (0x125): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 294 (0x126): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 295 (0x127): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 296 (0x128): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 297 (0x129): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 298 (0x12a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 299 (0x12b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 300 (0x12c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 301 (0x12d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 302 (0x12e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 303 (0x12f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 304 (0x130): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 305 (0x131): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 306 (0x132): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 307 (0x133): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 308 (0x134): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 309 (0x135): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 310 (0x136): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 311 (0x137): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 312 (0x138): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 313 (0x139): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 314 (0x13a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 315 (0x13b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 316 (0x13c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 317 (0x13d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 318 (0x13e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 319 (0x13f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 320 (0x140): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 321 (0x141): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 322 (0x142): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 323 (0x143): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 324 (0x144): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 325 (0x145): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 326 (0x146): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 327 (0x147): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 328 (0x148): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 329 (0x149): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 330 (0x14a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 331 (0x14b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 332 (0x14c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 333 (0x14d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 334 (0x14e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 335 (0x14f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 336 (0x150): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 337 (0x151): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 338 (0x152): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 339 (0x153): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 340 (0x154): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 341 (0x155): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 342 (0x156): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 343 (0x157): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 344 (0x158): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 345 (0x159): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 346 (0x15a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 347 (0x15b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 348 (0x15c): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 349 (0x15d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 350 (0x15e): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 351 (0x15f): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 352 (0x160): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 353 (0x161): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 354 (0x162): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 355 (0x163): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 356 (0x164): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 357 (0x165): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 358 (0x166): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 359 (0x167): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 360 (0x168): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 361 (0x169): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 362 (0x16a): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 363 (0x16b): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 364 (0x16c): no evdev -> QKeyCode mapping (xkb keysym XF86Favorites)

  // evdev 365 (0x16d): no evdev -> QKeyCode mapping (xkb keysym NoSymbol)

  // evdev 366 (0x16e): no evdev -> QKeyCode mapping (xkb keysym XF86Keyboard)

  //
  // quirks section start
  //
  // Sometimes multiple keysyms map to the same keycodes.
  // The keycode -> keysym lookup finds only one of the
  // keysyms.  So append them here.
  //

  ['Print', 0x54],
  ['Sys_Req', 0x54],
  ['Execute', 0x54],
  ['KP_Decimal', 0x53, 'numlock'],
  ['KP_Separator', 0x53, 'numlock'],
  ['Alt_R', 0xb8],
  ['ISO_Level3_Shift', 0xb8],
  ['Mode_switch', 0xb8],

  // quirks section end
];
export default keymap;
