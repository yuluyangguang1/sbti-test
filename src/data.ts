// SBTI 原版数据 - 来源: B站UP主 蛆肉儿串儿
// 数据来源: https://github.com/AnyiWang/SMBTI
// 评分体系: 选项 value=1/2/3，维度两题总分 2-3→L，4→M，5-6→H

export type DimensionLevel = 'H' | 'M' | 'L';

// 十五维指纹定义：5 套模型 × 3 维度
export interface DimensionDef {
  key: string;
  label: string;
  model: string;
  modelKey: string;
}

export const dimensionDefs: DimensionDef[] = [
  // 自我模型
  { key: 'S1', label: '自尊自信',  model: '自我模型',     modelKey: 'S' },
  { key: 'S2', label: '自我清晰度', model: '自我模型',     modelKey: 'S' },
  { key: 'S3', label: '核心价值',   model: '自我模型',     modelKey: 'S' },
  // 情感模型
  { key: 'E1', label: '依恋安全感', model: '情感模型',     modelKey: 'E' },
  { key: 'E2', label: '情感投入度', model: '情感模型',     modelKey: 'E' },
  { key: 'E3', label: '边界与依赖', model: '情感模型',     modelKey: 'E' },
  // 态度模型
  { key: 'A1', label: '世界观倾向', model: '态度模型',     modelKey: 'A' },
  { key: 'A2', label: '规则与灵活度', model: '态度模型',   modelKey: 'A' },
  { key: 'A3', label: '人生意义感', model: '态度模型',     modelKey: 'A' },
  // 行动驱力模型
  { key: 'Ac1', label: '动机导向',  model: '行动驱力模型', modelKey: 'Ac' },
  { key: 'Ac2', label: '决策风格',  model: '行动驱力模型', modelKey: 'Ac' },
  { key: 'Ac3', label: '执行模式',  model: '行动驱力模型', modelKey: 'Ac' },
  // 社交模型
  { key: 'So1', label: '社交主动性', model: '社交模型',    modelKey: 'So' },
  { key: 'So2', label: '人际边界感', model: '社交模型',    modelKey: 'So' },
  { key: 'So3', label: '表达与真实度', model: '社交模型',  modelKey: 'So' },
];

// 维度落点解读文案
export const dimensionInterpretations: Record<string, Record<DimensionLevel, string>> = {
  S1: { H: '自信满满，不容易被他人评价打倒', M: '自信时有时无，取决于今天的运气', L: '别人一句话能让你重新怀疑人生' },
  S2: { H: '对自己的脾气、欲望和底线都算门儿清', M: '大概知道自己什么样，偶尔还是会被自己吓到', L: '经常灵魂拷问：我到底是个啥' },
  S3: { H: '有目标有追求，外人的评价无所谓', M: '有在意的东西，但说不清到底最想要什么', L: '活着就行，意义是什么可以以后再想' },
  E1: { H: '更愿意相信关系本身，不会被一点风吹草动吓散', M: '时而安心时而焦虑，取决于对方的表现', L: '消息晚回五分钟就开始脑补分手大戏' },
  E2: { H: '爱就全力以赴，感情面前没有保留这个选项', M: '会投入，但会给自己留后手', L: '动心可以，动身得再等等' },
  E3: { H: '空间感很重要，再爱也得留一块属于自己的地', M: '有时黏有时冷，取决于心情和安全感的余额', L: '黏人度拉满，恨不得变成对方身上的挂件' },
  A1: { H: '相信好人更多，愿意给世界一个微笑', M: '既不天真也不彻底阴谋论', L: '邪恶的人心比世界上的痔疮更多' },
  A2: { H: '秩序感较强，规则就是规则', M: '该守规矩守规矩，该灵活时也能灵活', L: '规则？什么规则？我的人生我做主' },
  A3: { H: '做事有方向，坚信人生有意义', M: '也许有也许没有，走着看吧', L: '人生哪有什么意义，不过是低级生物的本能' },
  Ac1: { H: '成果驱动！看到结果就来了劲', M: '看心情，有时鸡血有时躺平', L: '咸鱼本鱼，能躺就不坐' },
  Ac2: { H: '拍板速度快，决定一下就不爱回头磨叽', M: '小事秒决定大事纠结到天亮', L: '选择困难症十级患者' },
  Ac3: { H: '推进欲强，事情不落地心里像卡了根刺', M: '想到就做，但也允许自己偶尔拖延', L: 'DDL是第一生产力，不到最后绝不动手' },
  So1: { H: '主动出击！认识新朋友的好机会嘛', M: '看场合，有人搭话我就接', L: '网上口嗨就算了，真见面还是有点忐忑' },
  So2: { H: '电子围栏焊死，靠太近会自动报警', M: '对有些人边界分明，对有些人毫无底线', L: '渴望和信任的人关系密切，熟得像失散亲戚' },
  So3: { H: '社交面具焊死在脸上，真实自我仅限深夜独处', M: '会看气氛说话，真实和体面通常各留一点', L: '有什么说什么，场面话和假笑不是我的强项' },
};

// 5 套模型的模型级描述
export const modelDescriptions: Record<string, { name: string; description: string }> = {
  S:  { name: '自我模型',  description: '看你对自己的评价是否稳定，认不认识自己，以及内心到底有没有特别要紧的东西' },
  E:  { name: '情感模型',  description: '看你在关系里容易焦虑还是安心，投入到什么程度，以及是否需要独立空间' },
  A:  { name: '态度模型',  description: '看你怎么看世界、规则和人生意义，是谨慎守序还是灵活冲动' },
  Ac: { name: '行动驱力模型', description: '看你做事更偏进攻还是规避，做决定果不果断，计划能不能落下来' },
  So: { name: '社交模型',  description: '看你会不会主动靠近人、边界感强不强，以及在不同关系里有多真实' },
};

// ===== 人格类型 =====
export interface PersonalityType {
  id: string;
  code: string;
  name: string;
  emoji: string;
  slogan: string;
  description: string;
  traits: string[];
  color: string;
  bgGradient: string;
  avatar?: string;
  dimensions: Record<string, DimensionLevel>;
  mbti?: string[];
  similar?: string[];
}

export const personalities: PersonalityType[] = [
  {
    id: "ctrl", code: "CTRL", name: "拿捏者", emoji: "😎",
    slogan: "怎么样，被我拿捏了吧？",
    description: `恭喜您，您测出了全中国最为罕见的人格，您是宇宙熵增定律的天然反抗者！全世界所谓成功人士里，99.99%都是您的拙劣模仿者。CTRL人格，是行走的人形自走任务管理器，普通人眼中的"规则"，在您这里只是出厂的基础参数设置；凡人所谓的"计划"，对您而言不过是心血来潮的随手涂鸦。拥有一个CTRL朋友意味着什么？意味着你的人生导航系统会变得更加精准、高效。因为CTRL最会拿捏了。CTRL会在你人生列车即将脱轨的前一秒，用一个"Ctrl+S"帮你硬核存档，再用一套无法拒绝的逻辑把你强行拽回正轨。他们是你混乱生活最后的备份盘，是宇宙崩塌前唯一还亮着的那个重启键。`,
    traits: ["全局掌控", "暗中操盘", "情绪稳定", "人形运筹帷幄"],
    color: "#6c5ce7", bgGradient: "from-purple-600 to-indigo-800",
    avatar: "/avatars/ctrl.png",
    dimensions: {"S1":"H","S2":"H","S3":"H","E1":"H","E2":"M","E3":"H","A1":"M","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"M","So2":"H","So3":"M"},
    mbti: ['ENTJ', 'INTJ'],
    similar: ['boss', 'gogo', 'poor']
  },
  {
    id: "atmer", code: "ATM-er", name: "送钱者", emoji: "💰",
    slogan: "你以为我很有钱吗？",
    description: `恭喜您，您竟然测出了这个世界上最稀有的人格。您或将成为金融界的未解之谜——是的，ATM-er不一定真的"送钱"，但可能永远在"支付"。支付时间、支付精力、支付耐心、支付一个本该安宁的夜晚。因此像一部老旧但坚固的ATM机，插进去的是别人的焦虑和麻烦，吐出来的是"没事，有我"的安心保证。您的人生就是一场盛大的、无人喝彩的单人付账秀。您竟用磐石般的可靠，承受了瀑布般的索取，偶尔夜深人静才会对着账单——可能是精神上的——发出一声叹息：我这该死的、无处安放的责任心啊。`,
    traits: ["人形ATM", "花钱大手大脚", "心软到骨头", "友谊的代价"],
    color: "#ffeaa7", bgGradient: "from-yellow-400 to-orange-500",
    avatar: "/avatars/atmer.png",
    dimensions: {"S1":"H","S2":"H","S3":"H","E1":"H","E2":"H","E3":"M","A1":"H","A2":"H","A3":"H","Ac1":"H","Ac2":"M","So1":"M","So2":"H","So3":"L"},
    mbti: ['ESFJ', 'ENFJ'],
    similar: ['ctrl', 'mum', 'thank']
  },
  {
    id: "diors", code: "Dior-s", name: "屌丝", emoji: "🛋️",
    slogan: "等着我屌丝逆袭。",
    description: `恭喜！您并非屌丝，您是犬儒主义先贤第欧根尼失散多年的精神传人，因为屌丝的全称是 Diogenes' Original Realist - sage。Dior-s人格，是对当代消费主义陷阱和成功学PUA最彻底的蔑视。他们不是"不求上进"，而是早已看穿一切"上进"的尽头不过是更高级的牢房。屌丝有着大智慧。当别人在追逐风口，被时代的巨浪拍得七荤八素时，Dior-s早已在自己的精神木桶里晒着太阳，达到了"人桶合一"的至高境界。他们信奉的不是空话，是经过亿万次实践检验的物理法则与生物本能：一、躺着比站着舒服；二、饭点到了就得干饭。`,
    traits: ["躺平哲学家", "消费主义反抗者", "精神木桶居民", "人间大智慧"],
    color: "#a29bfe", bgGradient: "from-violet-400 to-purple-600",
    avatar: "/avatars/diors.png",
    dimensions: {"S1":"M","S2":"M","S3":"H","E1":"M","E2":"M","E3":"H","A1":"M","A2":"M","A3":"H","Ac1":"M","Ac2":"H","So1":"L","So2":"H","So3":"L"},
    mbti: ['ISTP', 'INTP'],
    similar: ['malo', 'ojbk', 'zzzz']
  },
  {
    id: "boss", code: "BOSS", name: "领导者", emoji: "👑",
    slogan: "方向盘给我，我来开。",
    description: `BOSS是一个手里永远拿着方向盘的人。哪怕油箱已经亮了红灯，哪怕导航在胡说八道，你都会面无表情地说一句：我来开。然后真的把车开到了目的地。该人格拥有独立的物理法则——永恒向上定律。BOSS人格看世界，就像玩通关了的玩家在看新手教程。效率是他们的信仰，秩序是他们的呼吸。他们不是"自带领袖气场"，他们本身就是人形的气场发生器，方圆五米内，空气都会自动变得严肃而高效。他们眼中的"自我突破"，约等于普通人眼中的"自虐"。今天掌握一门新语言，明天考下一个专业证书，后天就计划殖民火星。你说这太卷了，他会用一种看弱鸡的眼神看着你：不是我太狠，是你太松。`,
    traits: ["天生领袖", "效率狂魔", "气场发生器", "永恒向上"],
    color: "#e17055", bgGradient: "from-red-500 to-orange-600",
    avatar: "/avatars/boss.png",
    dimensions: {"S1":"H","S2":"H","S3":"H","E1":"H","E2":"M","E3":"M","A1":"H","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"L","So2":"H","So3":"L"},
    mbti: ['ENTJ', 'ESTJ'],
    similar: ['ctrl', 'gogo', 'poor']
  },
  {
    id: "thank", code: "THAN-K", name: "感恩者", emoji: "🙏",
    slogan: "我感谢苍天！我感谢大地！",
    description: `恭喜您，您测出了全中国最为罕见的人格。您应当感谢我！感谢您在此刻拥有了生命的滋润！倘若您上班路上堵车了？您也应当说一句：我感谢这次堵车，它让我有更多时间聆听这首美妙的歌曲，并欣赏窗外每一张因焦虑而扭曲的脸庞，让我更珍惜内心的平静。是的，THAN-K拥有温润如玉的性格和海纳百川的胸怀。他们眼中的世界没有完全的坏人，只有"尚未被感恩光芒照耀到的朋友"。拥有一个THAN-K朋友，就像身边多了一个永不枯竭的正能量发射塔。TA甚至能帮你从墙角的霉斑里发现一幅梵高风格的星空图。`,
    traits: ["感恩永动机", "正能量发射塔", "温润如玉", "万物皆可爱"],
    color: "#55efc4", bgGradient: "from-green-300 to-teal-500",
    avatar: "/avatars/thank.png",
    dimensions: {"S1":"M","S2":"H","S3":"M","E1":"M","E2":"M","E3":"M","A1":"H","A2":"M","A3":"H","Ac1":"M","Ac2":"H","So1":"M","So2":"H","So3":"L"},
    mbti: ['ENFJ', 'ESFJ'],
    similar: ['atmer', 'mum', 'hhhh']
  },
  {
    id: "ohno", code: "OH-NO", name: "哦不人", emoji: "😱",
    slogan: "哦不！我怎么会是这个人格？！",
    description: `"哦不！"并非恐惧的尖叫，而是一种顶级的智慧。当普通人看到一个杯子放在桌沿，哦不人看到的是一场由"水渍-短路-火灾-全楼疏散-经济损失-蝴蝶效应-世界末日"构成的灾难史诗。于是，伴随着一声发自灵魂深处的 Oh, no!，他们会以迅雷不及掩耳之势把杯子挪到桌子正中央，然后再垫上一张吸水杯垫。哦不人对"边界"有一种近乎偏执的尊重：你的就是你的，我的就是我的。所有意外和风险都已经在他的"Oh, no!"声中，被扼杀在了萌芽状态。他们是秩序的守护神，是混乱世界里最后那批神经绷得很直的体面人。`,
    traits: ["风险预判大师", "边界守卫者", "秩序守护神", "神经绷得很直"],
    color: "#fd79a8", bgGradient: "from-pink-400 to-rose-500",
    avatar: "/avatars/ohno.png",
    dimensions: {"S1":"H","S2":"H","S3":"L","E1":"L","E2":"M","E3":"H","A1":"L","A2":"H","A3":"H","Ac1":"H","Ac2":"H","So1":"L","So2":"H","So3":"L"},
    mbti: ['ISTJ', 'ISFJ'],
    similar: ['think', 'ctrl', 'ohno']
  },
  {
    id: "gogo", code: "GOGO", name: "行者", emoji: "🏃",
    slogan: "gogogo~出发咯",
    description: `经研究发现，GOGO人格的大脑构造与常人有根本性不同。GOGO活在一个极致的"所见即所得"世界里，人生信条简单粗暴到令人发指：只要我闭上眼睛，天就是黑的；只要我把钱都花了，我就没有钱了；只要我站在斑马线上，我现在就是行人了。逻辑完美闭环，根本无法反驳。别人还在为"先有鸡还是先有蛋"而辩论，GOGO行者已经把鸡和蛋一起做成了一盘"鸡生蛋，蛋生鸡之终极奥义盖浇饭"。他们不是在"解决问题"，他们是在"清除待办事项"。对他们来说，世界上只有两种状态：已完成，和即将被我完成。`,
    traits: ["行动派", "所见即所得", "待办事项清除者", "逻辑完美闭环"],
    color: "#00b894", bgGradient: "from-green-400 to-emerald-600",
    avatar: "/avatars/gogo.png",
    dimensions: {"S1":"H","S2":"H","S3":"M","E1":"H","E2":"M","E3":"M","A1":"H","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"M","So2":"H","So3":"M"},
    mbti: ['ESTP', 'ESFP'],
    similar: ['ctrl', 'boss', 'sexy']
  },
  {
    id: "sexy", code: "SEXY", name: "尤物", emoji: "✨",
    slogan: "您就是天生的尤物！",
    description: `当您走进一个房间，照明系统会自动将您识别为天生的尤物，并自觉调暗亮度，以避免能源浪费。当您微笑时，您就变成了微笑着的尤物，周围的空气湿度也会显著下降，因为水蒸气都凝结成了人眼中的爱心。无论是谁，都容易对您的存在产生一种超标的注意力。传说，如果有足够多的SEXY人格聚集在一起开派对，其释放出的综合魅力能量足以暂时扭曲时空结构，让参加者产生"时间变慢了"的幸福错觉。他们不需要卖力表达，很多时候，单是存在本身就已经很像一篇华丽到过分的赋。`,
    traits: ["天生尤物", "魅力辐射", "存在即华丽", "时空扭曲级吸引力"],
    color: "#e84393", bgGradient: "from-pink-500 to-fuchsia-600",
    avatar: "/avatars/sexy.png",
    dimensions: {"S1":"H","S2":"M","S3":"H","E1":"H","E2":"H","E3":"L","A1":"H","A2":"M","A3":"M","Ac1":"H","Ac2":"M","So1":"H","So2":"L","So3":"H"},
    mbti: ['ENFP', 'ESFP'],
    similar: ['gogo', 'hhhh', 'lover']
  },
  {
    id: "lover", code: "LOVE-R", name: "多情者", emoji: "💕",
    slogan: "爱意太满，现实显得有点贫瘠。",
    description: `LOVE-R人格像远古神话时代幸存至今的珍稀物种，其存在概率比你在马桶里钓到作者胳膊的概率还低。您简直是这个钢铁森林时代最后的、也是最不合时宜的吟游诗人。因为您的情感处理器不是二进制的，而是彩虹制的。一片落叶，在常人眼里只是"秋天来了"，在LOVE-R眼中，则是一场关于轮回、牺牲与无言之爱的十三幕悲喜剧。您内心世界像一座永不关门的主题公园，一生都在寻找那个能看懂园区地图、并愿意陪你坐旋转木马直到宇宙尽头的灵魂伴侣。`,
    traits: ["彩虹制情感处理器", "吟游诗人", "灵魂伴侣寻找者", "爱意溢出"],
    color: "#fd79a8", bgGradient: "from-rose-400 to-pink-600",
    avatar: "/avatars/lover.png",
    dimensions: {"S1":"M","S2":"L","S3":"H","E1":"L","E2":"H","E3":"L","A1":"H","A2":"L","A3":"H","Ac1":"M","Ac2":"L","So1":"M","So2":"L","So3":"H"},
    mbti: ['INFP', 'ENFP'],
    similar: ['sexy', 'drunk', 'joker']
  },
  {
    id: "mum", code: "MUM", name: "妈妈", emoji: "🤱",
    slogan: "或许...我可以叫你妈妈吗....?",
    description: `恭喜您，您测出了全中国最稀有的妈妈人格。是的，在混沌未开、时间尚无姓名之前，在第一颗恒星打出第一个嗝之前，就已经有了妈妈。妈妈人格的底色是温柔，擅长感知情绪，具有超强共情力，知道什么时候该停下来，什么时候该对自己说一句"算了"。妈妈像一个医生，治愈了别人的不开心。只可惜，当妈妈落泪时，TA给自己的药，剂量总是比给别人小一号。MUM对自己的温柔，常常打了折。`,
    traits: ["超强共情力", "温柔底色", "治愈他人但忘了治愈自己", "给别人的药总是大一号"],
    color: "#81ecec", bgGradient: "from-cyan-300 to-teal-400",
    avatar: "/avatars/mum.png",
    dimensions: {"S1":"M","S2":"M","S3":"H","E1":"M","E2":"H","E3":"L","A1":"H","A2":"M","A3":"M","Ac1":"L","Ac2":"M","So1":"H","So2":"L","So3":"L"},
    mbti: ['ISFJ', 'INFJ'],
    similar: ['thank', 'atmer', 'poor']
  },
  {
    id: "fake", code: "FAKE", name: "伪人", emoji: "🎭",
    slogan: "已经，没有人类了。",
    description: `SCP基金会紧急报告：项目编号 SCP-CN-████ "伪人"。在社交场合，伪人是八面玲珑的存在，因为他们切换人格面具比切换手机输入法还快。上一秒还是推心置腹的铁哥们模式，下一秒领导来了，瞬间切换成沉稳可靠好员工模式，连脸上的光泽度和卷曲度都会发生微调。你以为你交到了一个真心懂你的朋友？醒醒。你只是幸运地遇到了一个善于伪装、高性能的仿生人罢了。夜深人静时，伪人把面具一层层摘下来，最后才发现，面具下空得很，正是这些面具构成了自己。`,
    traits: ["八面玲珑", "面具切换大师", "高性能仿生人", "面具即本体"],
    color: "#636e72", bgGradient: "from-gray-500 to-slate-700",
    avatar: "/avatars/fake.png",
    dimensions: {"S1":"H","S2":"L","S3":"M","E1":"M","E2":"M","E3":"L","A1":"M","A2":"L","A3":"M","Ac1":"M","Ac2":"L","So1":"H","So2":"L","So3":"H"},
    mbti: ['ENFJ', 'ENTP'],
    similar: ['sexy', 'joker', 'woc']
  },
  {
    id: "ojbk", code: "OJBK", name: "无所谓人", emoji: "🤷",
    slogan: "我说随便，是真的随便。",
    description: `让我们直面这个词的粗犷本质：OJBK。这已经不是一种人格，而是一种统治哲学。当凡人面临"中午吃米饭还是面条"的世纪抉择时，大脑在激烈燃烧卡路里；而OJBK人格，会用一种批阅奏章般的淡然，轻飘飘地吐出两个字：都行。这不是没主见，这是在告诉你：尔等凡俗的选择，于朕而言，皆为蝼蚁。为什么不争执？因为跟草履虫辩论宇宙的未来毫无意义。为什么不较真？因为帝王不会在意脚下的尘埃是往左飘还是往右飘。`,
    traits: ["统治哲学", "都行", "无所谓即无上境界", "帝王般淡然"],
    color: "#a29bfe", bgGradient: "from-violet-300 to-purple-500",
    avatar: "/avatars/ojbk.png",
    dimensions: {"S1":"M","S2":"M","S3":"M","E1":"M","E2":"M","E3":"M","A1":"H","A2":"L","A3":"L","Ac1":"M","Ac2":"M","So1":"M","So2":"M","So3":"L"},
    mbti: ['ISFP', 'INFP'],
    similar: ['zzzz', 'monk', 'fake']
  },
  {
    id: "malo", code: "MALO", name: "吗喽", emoji: "🐒",
    slogan: "人生是个副本，而我只是一只吗喽。",
    description: `朋友，你不是"童心未泯"，你压根就没进化。你的灵魂还停留在那个挂在树上荡秋千、看见香蕉就两眼放光的快乐时代。当人类祖先决定从树上下来、学会直立行走、穿上西装打领带时，吗喽人格的祖先在旁边的大树上看着他们，挠了挠屁股，嘴里发出一声不屑的"吱"。他们看透了一切：所谓的"文明"，不过是一场最无聊、最不好玩的付费游戏。规则偶尔是可以打破的，天花板是用来倒挂的，会议室是用来表演后空翻的。MALO本身就是一个从巨大脑洞里掉出来、忘了关门的奇思妙想。`,
    traits: ["快乐原始人", "反文明先锋", "奇思妙想发射器", "后空翻选手"],
    color: "#fdcb6e", bgGradient: "from-yellow-300 to-amber-500",
    avatar: "/avatars/malo.png",
    dimensions: {"S1":"M","S2":"L","S3":"H","E1":"M","E2":"H","E3":"M","A1":"M","A2":"L","A3":"H","Ac1":"M","Ac2":"L","So1":"L","So2":"M","So3":"H"},
    mbti: ['INTP', 'INFP'],
    similar: ['diors', 'joker', 'ohno']
  },
  {
    id: "joker", code: "JOKE-R", name: "小丑", emoji: "🤡",
    slogan: "我负责搞笑，谁负责爱我？",
    description: `你是聚会上最活跃的那个人，朋友圈里最会整活的那位，聊天群里永远的快乐源泉。所有人遇到不开心的事都会来找你，因为你能让他们笑。但深夜三点你盯着天花板发呆的时候，没有人问过你开不开心。你用幽默做铠甲，把脆弱藏在每一个段子后面。你是所有人的开心果，唯独不是自己的。`,
    traits: ["笑着笑着就哭了", "段子手", "全场的快乐但自己的悲伤", "被所有人需要却没人看穿"],
    color: "#ff6b6b", bgGradient: "from-red-400 to-rose-500",
    avatar: "/avatars/joker.png",
    dimensions: {"S1":"L","S2":"L","S3":"H","E1":"L","E2":"H","E3":"L","A1":"L","A2":"M","A3":"L","Ac1":"L","Ac2":"L","So1":"M","So2":"L","So3":"M"},
    mbti: ['ENTP', 'ESTP'],
    similar: ['malo', 'hhhh', 'woc']
  },
  {
    id: "woc", code: "WOC!", name: "握草人", emoji: "😱",
    slogan: "卧槽卧槽卧槽——今天又是信息量爆炸的一天。",
    description: `我们发现了一种神奇的生物——WOC!人。他们拥有两种完全独立的操作系统：一个叫"表面系统"，负责发出"我操""牛逼""啊？"等一系列大惊小怪的拟声词；另一个叫"后台系统"，负责冷静分析：嗯，果然不出我所料。WOC!人只会卧槽，不会多管闲事，因为他们深知，给傻逼讲道理，就像扶着烂泥上墙，不仅浪费体力，还弄自己一手屎。所以他们选择，握着一根智慧的大草，用一声饱含深情的"WOC！"来为这个疯狂的世界献上最高敬意。`,
    traits: ["震惊永动机", "双系统运行", "卧槽哲学家", "智慧大草持有者"],
    color: "#ffa502", bgGradient: "from-orange-400 to-amber-500",
    avatar: "/avatars/woc.png",
    dimensions: {"S1":"H","S2":"H","S3":"M","E1":"M","E2":"H","E3":"M","A1":"M","A2":"M","A3":"H","Ac1":"H","Ac2":"H","So1":"L","So2":"H","So3":"H"},
    mbti: ['ESFP', 'ENFP'],
    similar: ['ohno', 'joker', 'fuck']
  },
  {
    id: "think", code: "THIN-K", name: "思考者", emoji: "🤔",
    slogan: "已深度思考100s。",
    description: `经研究发现，THIN-K人格的大脑构造与常人有根本性不同。正如名称所示，您的大脑长时间处于思考状态。您十分会审判信息，注重论点、论据、逻辑推理、潜在偏见，乃至"作者本人三代以内思想背景调查报告"的全套材料。在这个信息爆炸的时代，您绝不会轻易盲从，会在关系中衡量利弊，也十分捍卫自己的自我空间。当别人看到您独处时在发呆？愚蠢，那不是发呆，那是您的大脑正在对今天接收到的所有信息进行分类、归档和销毁。`,
    traits: ["深度思考者", "信息审判官", "逻辑至死", "发呆是在归档"],
    color: "#0984e3", bgGradient: "from-blue-400 to-indigo-500",
    avatar: "/avatars/think.png",
    dimensions: {"S1":"H","S2":"H","S3":"M","E1":"L","E2":"H","E3":"M","A1":"M","A2":"H","A3":"M","Ac1":"H","Ac2":"M","So1":"L","So2":"H","So3":"H"},
    mbti: ['INTJ', 'INTP'],
    similar: ['ctrl', 'monk', 'fake']
  },
  {
    id: "shit", code: "SHIT", name: "愤世者", emoji: "💩",
    slogan: "这个世界，构石一坨。",
    description: `恭喜您，SHIT人格是宇宙中已知的唯一一种稀有人格。所谓狗屎，并不是在抱怨，而是在进行一种神秘仪式。SHIT的行为模式是一场惊天动地的悖论戏剧。嘴上：这个项目简直是屎。手上：默默打开 Excel，开始建构函数模型和甘特图。嘴上：这帮同事都是 shit。手上：在同事搞砸之后，一边烦着，一边熬夜把烂摊子收拾得明明白白。嘴上：这个世界就是一坨 shit，赶紧毁灭吧。手上：第二天早上七点准时起床，挤上 shit 一样的地铁，去干那份 shit 一样的工作。别怕，那不是世界末日的警报，那是他马上要开始拯救世界的冲锋号。`,
    traits: ["嘴上毁灭世界", "行动上拯救世界", "吐槽是爱你的方式", "人间清醒但很累"],
    color: "#636e72", bgGradient: "from-gray-500 to-zinc-700",
    avatar: "/avatars/shit.png",
    dimensions: {"S1":"H","S2":"H","S3":"L","E1":"L","E2":"H","E3":"M","A1":"M","A2":"M","A3":"H","Ac1":"H","Ac2":"H","So1":"L","So2":"H","So3":"H"},
    mbti: ['ENTP', 'INTJ'],
    similar: ['fuck', 'joker', 'think']
  },
  {
    id: "zzzz", code: "ZZZZ", name: "装死者", emoji: "💀",
    slogan: "我没死，我只是在睡觉。",
    description: `恭喜您，您测出了全中国最稀有的装死人格。群里99+条消息您可以视而不见，但当有人发出"@全体成员 还有半小时就截止了"的最后通牒时，您也许会像刚从千年古墓里苏醒一样，缓缓地敲出一个"收到"，然后在29分钟内，交出一份虽然及格的答卷。是的，直到"死线"这个唯一的、最高权限的指令出现，您就真正爆发了，不鸣则已，一鸣惊人。您向宇宙证明了一个真理：有时什么都不做，就不会做错。`,
    traits: ["选择性满血复活", "死线驱动型选手", "节能模式常驻", "一鸣惊人"],
    color: "#2d3436", bgGradient: "from-gray-700 to-gray-900",
    avatar: "/avatars/zzzz.png",
    dimensions: {"S1":"M","S2":"L","S3":"H","E1":"M","E2":"L","E3":"M","A1":"L","A2":"M","A3":"M","Ac1":"M","Ac2":"L","So1":"L","So2":"H","So3":"M"},
    mbti: ['ISTP', 'ISFP'],
    similar: ['dead', 'fake', 'monk']
  },
  {
    id: "poor", code: "POOR", name: "贫困者", emoji: "😢",
    slogan: "我穷，但我很专。",
    description: `恭喜您，您测出了【POOR - 贫困者】。这个"贫困"不是钱包余额的判决书，更像一种欲望断舍离后的资源再分配。别人把精力撒成漫天二维码，你把精力压成一束激光，照哪儿，哪儿就开始冒烟。POOR的世界很简单：不重要的东西一律降噪，重要的东西狠狠干到底。热闹、社交、虚荣、到处刷存在感？抱歉，没空。你不是资源少，你是把资源全部灌进了一个坑里，所以看起来像贫困，实际上像矿井。一旦某件事被你认定值得钻，外界再吵也只是背景杂音。`,
    traits: ["精力激光", "专一到离谱", "欲望断舍离", "看起来像贫困实际像矿井"],
    color: "#6c5ce7", bgGradient: "from-indigo-400 to-purple-600",
    avatar: "/avatars/poor.png",
    dimensions: {"S1":"H","S2":"M","S3":"L","E1":"M","E2":"H","E3":"L","A1":"M","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"L","So2":"H","So3":"L"},
    mbti: ['ISTJ', 'INTJ'],
    similar: ['ctrl', 'think', 'monk']
  },
  {
    id: "monk", code: "MONK", name: "僧人", emoji: "🧘",
    slogan: "没有那种世俗的欲望。",
    description: `当别人在KTV里参悟爱与恨的纠缠，MONK人格选择在家中参悟一份大道。MONK已然看破红尘，不希望闲人来扰其清修、破其道行。MONK的个人空间，是他们的结界，是他们的须弥山，是他们的绝对领域，神圣不可侵犯。踏入者，会感受到一种来自灵魂深处的窒息感。MONK们不黏不缠，因为在他们的世界观里，万物皆有其独立轨道。行星与行星之间保持着亿万公里的距离，才构成和谐宇宙，人与人之间为什么不行？`,
    traits: ["看破红尘", "个人空间即结界", "万物独立轨道", "没有世俗欲望"],
    color: "#dfe6e9", bgGradient: "from-slate-200 to-gray-400",
    avatar: "/avatars/monk.png",
    dimensions: {"S1":"H","S2":"L","S3":"L","E1":"H","E2":"L","E3":"M","A1":"M","A2":"M","A3":"L","Ac1":"M","Ac2":"M","So1":"L","So2":"H","So3":"M"},
    mbti: ['INFJ', 'INTJ'],
    similar: ['think', 'poor', 'zzzz']
  },
  {
    id: "imsb", code: "IMSB", name: "傻者", emoji: "🤪",
    slogan: "认真的么？我真的是傻逼么？",
    description: `恭喜您！您根本不在人类范畴内！您测出了百万年一遇的【IMSB】人格。IMSB人格的大脑里住着两个不死不休的究极战士：一个叫"我他妈冲了！"，另一个叫"我是个傻逼！"。当IMSB面对一个有好感的人时，前者会说：冲啊！去要微信！去约饭！爱要大声说出来！后者接着说：人家凭什么看得上你？你去了就是自取其辱！最终结果：盯着对方背影直到消失，然后掏出手机搜索"如何克服社交恐惧症"。IMSB不是真的傻，只是您的内心戏，可能比漫威宇宙所有电影加起来都长。`,
    traits: ["内心戏比漫威还长", "冲了又怂", "盯着背影消失", "傻但不真的傻"],
    color: "#a29bfe", bgGradient: "from-purple-300 to-indigo-400",
    avatar: "/avatars/imsb.png",
    dimensions: {"S1":"L","S2":"L","S3":"M","E1":"M","E2":"L","E3":"M","A1":"L","A2":"L","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"M","So2":"L","So3":"M"},
    mbti: ['INFP', 'ISFP'],
    similar: ['ohno', 'dead', 'malo']
  },
  {
    id: "solo", code: "SOLO", name: "孤儿", emoji: "🥺",
    slogan: "我哭了，我怎么会是孤儿？",
    description: `恭喜您，您测出了全中国最稀有的【SOLO - 孤儿】人格。别急着哭，国王的加冕仪式，通常都是一个人。孤儿的自我价值感偏低，因此有时主动疏远他人，孤儿们在自己的灵魂外围建起了一座名为"莫挨老子"的万里长城。每一块砖，都是过去的一道伤口。孤儿就像一只把所有软肋都藏起来，然后用最硬的刺对着世界的刺猬。那满身的尖刺不是攻击，那是一句句说不出口的"别过来，我怕你也受伤"和"求求你，别离开"。`,
    traits: ["万里长城守卫者", "刺猬型人格", "尖刺下是求救", "加冕仪式一个人"],
    color: "#74b9ff", bgGradient: "from-blue-300 to-sky-500",
    avatar: "/avatars/solo.png",
    dimensions: {"S1":"L","S2":"L","S3":"M","E1":"L","E2":"L","E3":"H","A1":"L","A2":"M","A3":"M","Ac1":"L","Ac2":"L","So1":"L","So2":"H","So3":"M"},
    mbti: ['INTP', 'ISTP'],
    similar: ['monk', 'zzzz', 'fake']
  },
  {
    id: "fuck", code: "FUCK", name: "草者", emoji: "🤬",
    slogan: "操！这是什么人格？",
    description: `恭喜您！您根本不在人类范畴内！您测出了百万年一遇的【FUCK】人格。人类文明城市里，出现了一株无法被任何除草剂杀死的、具有超级生命力的人形野草——那就是草者人格。它的学名，就叫 FUCK。在FUCK的世界观里，世俗规则简直毫无意义，并且FUCK的情绪开关是物理拨片式的：FUCK YEAH 和 FUCK OFF。FUCK追求的不只是当下快感，也在追求一种在体内横冲直撞的生命力。当所有人都被驯化成了温顺家禽，FUCK则是荒野上最后那一声狼嚎。`,
    traits: ["物理拨片式情绪", "人形野草", "荒野狼嚎", "生命力横冲直撞"],
    color: "#e17055", bgGradient: "from-red-400 to-orange-500",
    avatar: "/avatars/fuck.png",
    dimensions: {"S1":"M","S2":"L","S3":"H","E1":"L","E2":"H","E3":"L","A1":"L","A2":"L","A3":"M","Ac1":"M","Ac2":"L","So1":"H","So2":"L","So3":"H"},
    mbti: ['ENTP', 'ESTP'],
    similar: ['shit', 'joker', 'woc']
  },
  {
    id: "dead", code: "DEAD", name: "死者", emoji: "☠️",
    slogan: "我，还活着吗？",
    description: `恭喜您，您测出了全中国最为罕见的人格，只是"死者"这个名字实在有点晦气，所以也可以叫：Don't Expect Any Drives。死者已经看透了那些无意义的哲学思考，因此显得对一切"失去"了兴趣。死者们看世界的眼神，就像一位顶级玩家通关了所有主线、支线、隐藏任务，删档重开了999次之后，终于发现：这游戏压根就没意思。死者是超越了欲望和目标的终极贤者。他们的存在，就是对这个喧嚣世界最沉默也最彻底的抗议。`,
    traits: ["灵魂已下班", "终极贤者", "游戏删档999次", "沉默的抗议"],
    color: "#2d3436", bgGradient: "from-zinc-800 to-black",
    avatar: "/avatars/dead.png",
    dimensions: {"S1":"L","S2":"L","S3":"L","E1":"L","E2":"L","E3":"M","A1":"L","A2":"M","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"L","So2":"M","So3":"L"},
    mbti: ['INFP', 'ISFP'],
    similar: ['imsb', 'zzzz', 'fake']
  },
  {
    id: "imfw", code: "IMFW", name: "废物", emoji: "🗑️",
    slogan: "我真的...是废物吗？",
    description: `恭喜您，您测出的不是一个普通人格，您是一种极其珍稀的、仅占世界人口0.0001％的——【废物】。废物们的自尊通常有些脆弱，缺乏安全感，偶尔也会缺乏主见，因此这种人格能精确地感知到周围最强的那个 WiFi 信号——也就是他们心里最可靠的人。走进【废物】人格的生活，就像走进了一个顶级兰花温室：需要精确控制温度、湿度，以及每天定时进行"我爱你"的言语光合作用。给废物一颗糖，他们会还你一个完全信任你、亮晶晶的眼神。你未必是废物，你只是太没防备，太容易认真。`,
    traits: ["兰花温室", "太没防备", "太容易认真", "亮晶晶的眼神"],
    color: "#b2bec3", bgGradient: "from-gray-300 to-slate-500",
    avatar: "/avatars/imfw.png",
    dimensions: {"S1":"L","S2":"L","S3":"H","E1":"L","E2":"H","E3":"L","A1":"M","A2":"L","A3":"M","Ac1":"L","Ac2":"L","Ac3":"L","So1":"M","So2":"L","So3":"L"},
    mbti: ['ISFP', 'INFP'],
    similar: ['dead', 'imsb', 'ohno']
  },
  {
    id: "hhhh", code: "HHHH", name: "傻乐者", emoji: "😄",
    slogan: "哈哈哈哈哈哈。",
    description: `恭喜您！由于您的思维回路过于清奇，标准人格库已全面崩溃。第一人格匹配率只有60％以下时，系统才会为您强制匹配这个人格——【HHHH - 傻乐者】。这个人格有什么特质？哈哈哈哈哈哈哈哈哈哈哈哈！对不起，这就是全部的特质了。您可以查看十五维度进行不专业的评估，实在是抱歉！作者设置人格时没有考虑全面，因此才会出现这样的状况。哈哈哈哈哈哈……笑着笑着，我便哭了出来。怎么会有人的脑回路这么新奇。`,
    traits: ["快乐永动机", "思维回路清奇", "哈哈哈哈哈哈", "笑着笑着就哭了"],
    color: "#ffeaa7", bgGradient: "from-yellow-200 to-amber-300",
    avatar: "/avatars/hhhh.png",
    dimensions: {},  // 兜底人格，无固定维度模式
    mbti: ['ESFP', 'ENFP'],
    similar: ['joker', 'gogo', 'sexy']
  },
  {
    id: "drunk", code: "DRUNK", name: "酒鬼", emoji: "🍺",
    slogan: "烈酒烧喉，不得不醉。",
    description: `您为什么走路摇摇晃晃？您为什么总是情绪高涨？您为什么看东西是重影的？因为您体内流淌的不是血液，是美味的五粮液！是国窖1573！是江小白！是陕西五粮液！哦，美味的白酒，每一滴都在燃烧，都在沸腾。您是否已经习惯了将白酒灌入保温杯，当作白开水一饮而下？多么伟大的白酒！它让您在饭桌上谈笑风生，在厕所里抱着马桶忏悔人生；它让您觉得自己是夜场诗人，是宇宙中心那团不灭的火，直到第二天上午十点，您的头像裂开的核桃，嘴角挂着食物残渣，灵魂缩在角落里。您终于明白，昨晚那个高谈阔论、拍桌怒吼的人，已经成为了一个酒鬼。`,
    traits: ["白酒灌保温杯", "夜场诗人", "第二天上午裂开", "烈酒烧喉"],
    color: "#d63031", bgGradient: "from-red-600 to-red-800",
    avatar: "/avatars/drunk.png",
    dimensions: {},  // 隐藏人格，门控触发
    mbti: ['ENFP', 'ISFP'],
    similar: ['lover', 'joker', 'ohno']
  },
];

// ===== 原版题目系统 =====
// 30道常规题 + 1道爱好门控题 + 1道饮酒触发题

export interface OriginalQuestion {
  id: string;
  text: string;
  dimension: string;
  options: { label: string; value: number }[];  // value: 1/2/3
}

export interface GateQuestion {
  id: string;
  text: string;
  options: { label: string; value: number | string }[];
  behavior?: string;
}

export const originalQuestions: OriginalQuestion[] = [
  // ===== 自我模型 S =====
  { id: 'q1', text: '我是一只阴暗的老鼠，一只爬行的蟑螂，这辈子没谈过一场恋爱，胆怯又自卑，我的青春就是一场又一场的幻想，每一天幻想着我也能有一个爱我的人和我一起压马路，一起逛街，一起玩，现实却是花了父母的钱读了个学校，毕业之后找班上，寻找着理想，寻找着目标，每次看到大家能在网上开幸福的玩笑，我都想哭。我在羡慕生活的各种美好，却还在寻找自己的方向。每一次看到这种都是对我心灵的一次伤害，求求大家给我们这种在被窝里偷窥的人一点活路吧，我真的不想在白天把枕巾哭湿一大片',
    dimension: 'S1',
    options: [
      { label: '我哭了。。', value: 1 },
      { label: '这是什么。。', value: 2 },
      { label: '这不是我！', value: 3 },
    ]},
  { id: 'q2', text: '我不够好，周围的人都比我优秀',
    dimension: 'S1',
    options: [
      { label: '确实', value: 1 },
      { label: '有时', value: 2 },
      { label: '不是', value: 3 },
    ]},
  { id: 'q3', text: '我很清楚真正的自己是什么样的',
    dimension: 'S2',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q4', text: '我内心有真正追求的东西',
    dimension: 'S2',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q5', text: '我一定要不断往上爬、变得更厉害',
    dimension: 'S3',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q6', text: '外人的评价对我来说无所谓。',
    dimension: 'S3',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  // ===== 情感模型 E =====
  { id: 'q7', text: '对象超过5小时没回消息，说自己窜稀了，你会怎么想？',
    dimension: 'E1',
    options: [
      { label: '拉稀不可能5小时，也许ta隐瞒了我。', value: 1 },
      { label: '在信任和怀疑之间摇摆。', value: 2 },
      { label: '也许今天ta真的不太舒服。', value: 3 },
    ]},
  { id: 'q8', text: '我在感情里经常担心被对方抛弃',
    dimension: 'E1',
    options: [
      { label: '是的', value: 1 },
      { label: '偶尔', value: 2 },
      { label: '不是', value: 3 },
    ]},
  { id: 'q9', text: '我对天发誓，我对待每一份感情都是认真的！',
    dimension: 'E2',
    options: [
      { label: '并没有', value: 1 },
      { label: '也许？', value: 2 },
      { label: '是的！（问心无愧骄傲脸）', value: 3 },
    ]},
  { id: 'q10', text: '你的恋爱对象是一个尊老爱幼，温柔敦厚，洁身自好，光明磊落，大义凛然，能言善辩，口才流利，观察入微，见多识广，博学多才，诲人不倦，和蔼可亲，平易近人，心地善良，慈眉善目，积极进取，意气风发，玉树临风，国色天香，倾国倾城，花容月貌的人，此时你会？',
    dimension: 'E2',
    options: [
      { label: '就算ta再优秀我也不会陷入太深。', value: 1 },
      { label: '会介于A和C之间。', value: 2 },
      { label: '会非常珍惜ta，也许会变成恋爱脑。', value: 3 },
    ]},
  { id: 'q11', text: '恋爱后，对象非常黏人，你作何感想？',
    dimension: 'E3',
    options: [
      { label: '那很爽了', value: 1 },
      { label: '都行无所谓', value: 2 },
      { label: '我更喜欢保留独立空间', value: 3 },
    ]},
  { id: 'q12', text: '我在任何关系里都很重视个人空间',
    dimension: 'E3',
    options: [
      { label: '我更喜欢依赖与被依赖', value: 1 },
      { label: '看情况', value: 2 },
      { label: '是的！（斩钉截铁地说道）', value: 3 },
    ]},
  // ===== 态度模型 A =====
  { id: 'q13', text: '大多数人是善良的',
    dimension: 'A1',
    options: [
      { label: '其实邪恶的人心比世界上的痔疮更多。', value: 1 },
      { label: '也许吧。', value: 2 },
      { label: '是的，我愿相信好人更多。', value: 3 },
    ]},
  { id: 'q14', text: '你走在街上，一位萌萌的小女孩蹦蹦跳跳地朝你走来（正脸、侧脸看都萌，用vivo、苹果、华为、OPPO手机看都萌，实在是非常萌的那种），她递给你一根棒棒糖，此时你作何感想？',
    dimension: 'A1',
    options: [
      { label: '呜呜她真好真可爱！居然给我棒棒糖！', value: 3 },
      { label: '一脸懵逼，作挠头状', value: 2 },
      { label: '这也许是一种新型诈骗？还是走开为好。', value: 1 },
    ]},
  { id: 'q15', text: '快考试了，学校规定必须上晚自习，请假会扣分，但今晚你约了女/男神一起玩《绝地求生：刺激战场》（一款刺激的游戏），你怎么办？',
    dimension: 'A2',
    options: [
      { label: '翘了！反正就一次！', value: 1 },
      { label: '干脆请个假吧。', value: 2 },
      { label: '都快考试了还去啥。', value: 3 },
    ]},
  { id: 'q16', text: '我喜欢打破常规，不喜欢被束缚',
    dimension: 'A2',
    options: [
      { label: '认同', value: 1 },
      { label: '保持中立', value: 2 },
      { label: '不认同', value: 3 },
    ]},
  { id: 'q17', text: '我做事通常有目标。',
    dimension: 'A3',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q18', text: '突然某一天，我发现人生哪有什么真正的意义，某种程度，人不过是和动物一样被各种欲望支配着，被激素控制着，饿了就吃，困了就睡，只是一种无聊又低级的生物罢了，本质跟猫猫狗狗没什么区别。',
    dimension: 'A3',
    options: [
      { label: '是这样的。', value: 1 },
      { label: '也许是，也许不是。', value: 2 },
      { label: '这简直是胡扯', value: 3 },
    ]},
  // ===== 行动驱力模型 Ac =====
  { id: 'q19', text: '我做事主要为了取得成果和进步，而不是避免麻烦和风险。',
    dimension: 'Ac1',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q20', text: '你因便秘坐在马桶上（已长达30分钟），拉不出很难受。此时你更像',
    dimension: 'Ac1',
    options: [
      { label: '再坐三十分钟看看，说不定就有了。', value: 1 },
      { label: '用力拍打自己的屁股并说："死屁股，快拉啊！"', value: 2 },
      { label: '使用开塞露，快点拉出来才好。', value: 3 },
    ]},
  { id: 'q21', text: '我做决定比较果断，不喜欢犹豫',
    dimension: 'Ac2',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
  { id: 'q22', text: '此题没有题目，请盲选',
    dimension: 'Ac2',
    options: [
      { label: '反复思考后感觉应该选A？', value: 1 },
      { label: '啊，要不选B？', value: 2 },
      { label: '不会就选C？', value: 3 },
    ]},
  { id: 'q23', text: '别人说你"执行力强"，你内心更接近哪句？',
    dimension: 'Ac3',
    options: [
      { label: '我被逼到最后确实执行力超强。。。', value: 1 },
      { label: '啊，有时候吧。', value: 2 },
      { label: '是的，事情本来就该被推进', value: 3 },
    ]},
  { id: 'q24', text: '我做事常常有计划，___',
    dimension: 'Ac3',
    options: [
      { label: '然而计划不如变化快。', value: 1 },
      { label: '有时能完成，有时不能。', value: 2 },
      { label: '我讨厌被打破计划。', value: 3 },
    ]},
  // ===== 社交模型 So =====
  { id: 'q25', text: '你因玩《第五人格》（一款刺激的游戏）而结识许多网友，并被邀请线下见面，你的想法是？',
    dimension: 'So1',
    options: [
      { label: '网上口嗨下就算了，真见面还是有点忐忑。', value: 1 },
      { label: '见网友也挺好，反正谁来聊我就聊两句。', value: 2 },
      { label: '我会打扮一番并热情聊天，万一呢，我是说万一呢？', value: 3 },
    ]},
  { id: 'q26', text: '朋友带了ta的朋友一起来玩，你最可能的状态是',
    dimension: 'So1',
    options: [
      { label: '对"朋友的朋友"天然有点距离感，怕影响二人关系', value: 1 },
      { label: '看对方，能玩就玩。', value: 2 },
      { label: '朋友的朋友应该也算我的朋友！要热情聊天', value: 3 },
    ]},
  { id: 'q27', text: '我和人相处主打一个电子围栏，靠太近会自动报警。',
    dimension: 'So2',
    options: [
      { label: '认同', value: 3 },
      { label: '中立', value: 2 },
      { label: '不认同', value: 1 },
    ]},
  { id: 'q28', text: '我渴望和我信任的人关系密切，熟得像失散多年的亲戚。',
    dimension: 'So2',
    options: [
      { label: '认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '不认同', value: 3 },
    ]},
  { id: 'q29', text: '有时候你明明对一件事有不同的、负面的看法，但最后没说出来。多数情况下原因是：',
    dimension: 'So3',
    options: [
      { label: '这种情况较少。', value: 1 },
      { label: '可能碍于情面或者关系。', value: 2 },
      { label: '不想让别人知道自己是个阴暗的人。', value: 3 },
    ]},
  { id: 'q30', text: '我在不同人面前会表现出不一样的自己',
    dimension: 'So3',
    options: [
      { label: '不认同', value: 1 },
      { label: '中立', value: 2 },
      { label: '认同', value: 3 },
    ]},
];

// 门控题1：您平时有什么爱好？
export const hobbyGate: GateQuestion = {
  id: 'hobby_gate',
  text: '您平时有什么爱好？',
  options: [
    { label: '吃喝拉撒', value: 1 },
    { label: '艺术爱好', value: 2 },
    { label: '饮酒', value: 3 },
    { label: '健身', value: 4 },
  ],
};

// 门控题2：只有选了"饮酒"才出现
export const drinkTrigger: GateQuestion = {
  id: 'drink_trigger',
  text: '您对饮酒的态度是？',
  options: [
    { label: '小酌怡情，喝不了太多。', value: 1 },
    { label: '我习惯将白酒灌在保温杯，当白开水喝，酒精令我信服。', value: 2 },
  ],
};

// ===== 评分计算系统 =====

// 维度得分转等级（原版规则：两题总分 2-3→L，4→M，5-6→H）
export function scoreToLevel(score: number): DimensionLevel {
  if (score >= 5) return 'H';
  if (score >= 4) return 'M';
  return 'L';
}

// 计算用户15维向量
export function calculateDimensions(answers: Record<string, number>): Record<string, DimensionLevel> {
  const dimScores: Record<string, number> = {};

  // 累加每个维度的得分
  for (const q of originalQuestions) {
    const val = answers[q.id];
    if (val !== undefined) {
      dimScores[q.dimension] = (dimScores[q.dimension] || 0) + val;
    }
  }

  const levels: Record<string, DimensionLevel> = {};
  for (const dim of dimensionDefs) {
    const score = dimScores[dim.key] || 4; // 默认中间值
    levels[dim.key] = scoreToLevel(score);
  }
  return levels;
}

// 计算用户15维向量与人格模板的匹配度
// 原版算法：计算距离，距离最小者匹配
function calculateDistance(userDims: Record<string, DimensionLevel>, personalityDims: Record<string, DimensionLevel>): number {
  let distance = 0;
  const levelMap: Record<DimensionLevel, number> = { 'L': 1, 'M': 2, 'H': 3 };

  for (const dim of dimensionDefs) {
    const uVal = levelMap[userDims[dim.key]] || 2;
    const pVal = levelMap[personalityDims[dim.key]] || 2;
    distance += Math.abs(uVal - pVal);
  }
  return distance;
}

// 主匹配函数：找到最匹配的人格
export function matchPersonality(
  dimensionLevels: Record<string, DimensionLevel>,
  isDrunk: boolean
): { personality: PersonalityType; matchScore: number } {
  // 特殊规则：白酒当水喝 → 直接返回酒鬼
  if (isDrunk) {
    const drunk = personalities.find(p => p.id === 'drunk')!;
    return { personality: drunk, matchScore: 1.0 };
  }

  // 计算每个人格的距离
  let bestMatch = personalities[0];
  let bestDistance = Infinity;

  for (const p of personalities) {
    if (p.id === 'drunk' || p.id === 'hhhh') continue; // 特殊人格只能通过条件触发
    if (Object.keys(p.dimensions).length === 0) continue; // 跳过无维度的人格

    const dist = calculateDistance(dimensionLevels, p.dimensions);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestMatch = p;
    }
  }

  // 原版相似度公式：max(0, (1 - 距离/30) × 100)
  const similarity = Math.max(0, (1 - bestDistance / 30));

  // 如果最高匹配度 < 60%，返回傻乐者（兜底人格）
  if (similarity < 0.6) {
    const hhhh = personalities.find(p => p.id === 'hhhh')!;
    return { personality: hhhh, matchScore: similarity };
  }

  return { personality: bestMatch, matchScore: similarity };
}

// ===== 原版头像映射 =====
// 人格ID → 原版图鉴文件名（来自 SBTI 原版仓库）
export const originalAvatarMap: Record<string, string> = {
  ctrl:  'CTRL.png',
  atmer: 'ATM-er.png',
  diors: 'Dior-s.jpg',
  boss:  'BOSS.png',
  thank: 'THAN-K.png',
  ohno:  'OH-NO.png',
  gogo:  'GOGO.png',
  sexy:  'SEXY.png',
  lover: 'LOVE-R.png',
  mum:   'MUM.png',
  fake:  'FAKE.png',
  ojbk:  'OJBK.png',
  malo:  'MALO.png',
  joker: 'JOKE-R.jpg',
  woc:   'WOC.png',
  think: 'THIN-K.png',
  shit:  'SHIT.png',
  zzzz:  'ZZZZ.png',
  poor:  'POOR.png',
  monk:  'MONK.png',
  imsb:  'IMSB.png',
  solo:  'SOLO.png',
  hhhh:  'HHHH.png',
  drunk: 'DRUNK.png',
  imfw:  'IMFW.png',
  dead:  'DEAD.png',
  fuck:  'FUCK.png',
};

// 图鉴风格类型
export type AvatarStyle = 'remastered' | 'original';

// 根据风格获取头像路径
export function getAvatarPath(personalityId: string, style: AvatarStyle = 'remastered'): string | undefined {
  if (style === 'original') {
    const filename = originalAvatarMap[personalityId];
    return filename ? `/avatars-original/${filename}` : undefined;
  }
  // remastered: 用 data.ts 中的默认路径
  const p = personalities.find(p => p.id === personalityId);
  return p?.avatar;
}

// 兼容旧接口
export interface Question {
  id: number;
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

export const questions: Question[] = [];
