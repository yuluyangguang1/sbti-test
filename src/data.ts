// SBTI 27 Personality Types

// 十五维指纹定义：5 套模型 × 3 维度
export type DimensionLevel = 'H' | 'M' | 'L';

export interface DimensionDef {
  key: string;       // 如 "S1", "E2", "Ac3"
  label: string;     // 如 "自尊自信"
  model: string;     // 所属模型名，如 "自我模型"
  modelKey: string;  // 模型缩写，如 "S"
}

// 15 个维度的完整定义
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
  S1: { H: '心里对自己大致有数，不太会被路人一句话打散', M: '自信有时来有时走，取决于今天运气', L: '别人一句话能让你重新怀疑人生' },
  S2: { H: '对自己的脾气、欲望和底线都算门儿清', M: '大概知道自己什么样，偶尔还是会被自己吓到', L: '经常灵魂拷问：我到底是个啥' },
  S3: { H: '很容易被目标、成长或某种重要信念推着往前', M: '有在意的东西，但说不清到底最想要什么', L: '活着就行，意义是什么可以以后再想' },
  E1: { H: '更愿意相信关系本身，不会被一点风吹草动吓散', M: '时而安心时而焦虑，取决于对方的表现', L: '消息晚回五分钟就开始脑补分手大戏' },
  E2: { H: '爱就全力以赴，感情面前没有保留这个选项', M: '会投入，但会给自己留后手，不至于全盘梭哈', L: '动心可以，动身得再等等' },
  E3: { H: '空间感很重要，再爱也得留一块属于自己的地', M: '有时黏有时冷，取决于心情和安全感的余额', L: '黏人度拉满，恨不得变成对方身上的挂件' },
  A1: { H: '既不天真也不彻底阴谋论，观望是你的本能', M: '有时觉得世界很美好，有时又觉得人类没救', L: '世界要么全是好人，要么全是坏人，没有中间态' },
  A2: { H: '秩序感较强，能按流程来就不爱即兴炸场', M: '该守规矩守规矩，该灵活时也能灵活', L: '规则？什么规则？我的人生我做主' },
  A3: { H: '做事更有方向，知道自己大概要往哪边走', M: '有时候觉得活着挺好的，有时候觉得也就那样', L: '人生嘛...走着看吧' },
  Ac1: { H: '更容易被成果、成长和推进感点燃', M: '动力看心情，有时鸡血有时躺平', L: '咸鱼本鱼，能躺就不坐' },
  Ac2: { H: '拍板速度快，决定一下就不爱回头磨叽', M: '小事秒决定大事纠结到天亮', L: '选择困难症十级患者' },
  Ac3: { H: '推进欲比较强，事情不落地心里都像卡了根刺', M: '想到就做，但也允许自己偶尔拖延', L: 'DDL是第一生产力，不到最后绝不动手' },
  So1: { H: '有人来就接，没人来也不硬凑，社交弹性一般', M: '看场合看心情，社交电池忽满忽空', L: '独处是充电，社交是放电，而且是快充快放' },
  So2: { H: '边界感偏强，靠太近会先本能性后退半步', M: '对有些人边界分明，对有些人毫无底线', L: '来者不拒，谁都可能变成你的知心好友' },
  So3: { H: '有什么说什么，场面话和假笑不是你的强项', M: '会看气氛说话，真实和体面通常各留一点', L: '社交面具焊死在脸上，真实自我仅限深夜独处' },
};

// 5 套模型的模型级描述
export const modelDescriptions: Record<string, { name: string; description: string }> = {
  S:  { name: '自我模型',  description: '看你对自己的评价是否稳定，认不认识自己，以及内心到底有没有特别要紧的东西' },
  E:  { name: '情感模型',  description: '看你在关系里容易焦虑还是安心，投入到什么程度，以及是否需要独立空间' },
  A:  { name: '态度模型',  description: '看你怎么看世界、规则和人生意义，是谨慎守序还是灵活冲动' },
  Ac: { name: '行动驱力模型', description: '看你做事更偏进攻还是规避，做决定果不果断，计划能不能落下来' },
  So: { name: '社交模型',  description: '看你会不会主动靠近人、边界感强不强，以及在不同关系里有多真实' },
};

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
  dimensions: Record<string, DimensionLevel>; // 15维落点，key 如 "S1", "E2" 等
  mbti?: string[]; // 对应 MBTI 类型
  similar?: string[]; // 相似人格 ID
}

export const personalities: PersonalityType[] = [
  {
    id: "ctrl", code: "#3C", name: "拿捏者", emoji: "😎",
    slogan: "被拿捏了？那说明你值得。",
    description: "别人以为你在随缘，其实你在下大棋。你的人生信条就一个字——稳。别人慌得一批的时候你还在刷手机，不是你不在乎，是你早就预判了。朋友圈合照你永远站在最不起眼的角落，但所有人都知道这局是谁在操盘。你是那种「我什么都没做，但事情就成了」的神秘生物。",
    traits: ["全局掌控", "暗中操盘", "情绪稳定", "人形运筹帷幄"],
    color: "#6c5ce7", bgGradient: "from-purple-600 to-indigo-800",
    avatar: "/avatars/ctrl.png",
    dimensions: {"S1":"H","S2":"H","S3":"H","E1":"H","E2":"M","E3":"H","A1":"M","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"M","So2":"H","So3":"M"},
    mbti: ['ENTJ', 'INTJ'],
    similar: ['boss', 'gogo', 'poor']
  },
  {
    id: "atmer", code: "#1C", name: "送钱者", emoji: "💰",
    slogan: "我的钱包，你的钱包，分不清了。",
    description: "你是行走的AA制终结者，有你在的饭局永远不需要讨论谁买单。不是你有钱，是你对钱有一种「多出来不如给大家花」的执念。月底余额两位数的时候你也只是笑笑说「没事，快乐无价」。朋友嘴上心疼你，身体很诚实地继续坑你。",
    traits: ["人形ATM", "花钱大手大脚", "心软到骨头", "友谊的代价"],
    color: "#ffeaa7", bgGradient: "from-yellow-400 to-orange-500",
    avatar: "/avatars/atmer.png",
    dimensions: {"S1":"M","S2":"M","S3":"M","E1":"H","E2":"H","E3":"L","A1":"M","A2":"M","A3":"M","Ac1":"M","Ac2":"L","Ac3":"M","So1":"H","So2":"L","So3":"H"},
    mbti: ['ESFJ', 'ENFJ'],
    similar: ['lover', 'mum', 'thank']
  },
  {
    id: "diors", code: "#0C", name: "屌丝", emoji: "🥲",
    slogan: "正在逆袭中，请稍候...",
    description: "你以为你在摆烂，其实你在蓄力。你是那种白天被社会毒打、晚上在被窝里规划人生蓝图的人。你的备忘录里躺着三个创业计划、五个赚钱副业和一整年的flag。虽然一个都没实现，但你始终坚信：总有一天，命运会给你一个大逼兜...啊不，大惊喜。",
    traits: ["永不服输", "蓄力中", "flag专业户", "逆袭剧本主角"],
    color: "#e17055", bgGradient: "from-orange-500 to-red-600",
    avatar: "/avatars/diors.png",
    dimensions: {"S1":"L","S2":"M","S3":"H","E1":"L","E2":"M","E3":"M","A1":"M","A2":"L","A3":"H","Ac1":"H","Ac2":"M","Ac3":"L","So1":"M","So2":"M","So3":"M"},
    mbti: ['ENTP', 'ESFP'],
    similar: ['malo', 'joker', 'imsb']
  },
  {
    id: "boss", code: "#2C", name: "领导者", emoji: "👑",
    slogan: "别吵了，听我的就完了。",
    description: "你是那种小组作业里默认的组长、聚会中天然的组织者、混乱场面中第一个站起来说「跟我走」的人。你不是想管别人，是你看不得事情没人管。你的领导力不是学来的，是DNA里刻的。有时候你也想当个小透明，但你的气场不允许。",
    traits: ["天生的C位", "不请自来当领导", "决策速度光速", "众人仰望的存在"],
    color: "#00cec9", bgGradient: "from-teal-400 to-cyan-600",
    avatar: "/avatars/boss.png",
    dimensions: {"S1":"H","S2":"H","S3":"H","E1":"M","E2":"M","E3":"H","A1":"M","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"H","So2":"H","So3":"M"},
    mbti: ['ENTJ', 'ESTJ'],
    similar: ['ctrl', 'gogo', 'sexy']
  },
  {
    id: "thank", code: "#0S", name: "感恩者", emoji: "🙏",
    slogan: "谢谢，真的谢谢，发自肺腑地谢谢。",
    description: "别人帮你递张纸巾你能感动三天，有人请喝杯奶茶你恨不得写封感谢信。你是当代社交中最稀缺的物种——一个真心觉得「别人对我好好啊」的人。在这个人人精致的年代，你的真诚有时候显得有点傻，但所有人都想交你这个朋友。",
    traits: ["感动体质", "谢谢你的谢谢", "太容易被打动", "人间的温暖担当"],
    color: "#55efc4", bgGradient: "from-green-300 to-emerald-500",
    avatar: "/avatars/thank.png",
    dimensions: {"S1":"M","S2":"M","S3":"H","E1":"H","E2":"H","E3":"M","A1":"H","A2":"H","A3":"H","Ac1":"M","Ac2":"M","Ac3":"M","So1":"H","So2":"M","So3":"H"},
    mbti: ['ISFJ', 'INFJ'],
    similar: ['lover', 'mum', 'atmer']
  },
  {
    id: "ohno", code: "#1S", name: "哦不人", emoji: "😳",
    slogan: "完了完了完了完了——等等，好像还行？",
    description: "你的人生BGM是一首永不停歇的《哦不交响曲》。手机摔了——哦不！报告交晚了——哦不！打错字发到公司群了——哦不不不不！但神奇的是，每次你以为天要塌的时候，最后都莫名其妙化解了。你已经分不清是你运气好，还是宇宙觉得逗你玩更有趣。",
    traits: ["哦不永动机", "自带反转体质", "精神状态波动极大", "薛定谔的倒霉蛋"],
    color: "#ff7675", bgGradient: "from-red-400 to-pink-500",
    avatar: "/avatars/ohno.png",
    dimensions: {"S1":"L","S2":"L","S3":"M","E1":"L","E2":"H","E3":"L","A1":"L","A2":"M","A3":"M","Ac1":"M","Ac2":"L","Ac3":"L","So1":"M","So2":"L","So3":"M"},
    mbti: ['ENFP', 'INFP'],
    similar: ['woc', 'imsb', 'malo']
  },
  {
    id: "gogo", code: "#2S", name: "行者", emoji: "🏃",
    slogan: "你还在想？我已经到了。",
    description: "别人的「下次一定」在你这里就是「现在就走」。说走就走的旅行你是发起人，深夜的决定第二天就执行，冲动吗？有一点。后悔吗？从不。你觉得人生最大的遗憾不是做错，而是「差点做了但没做」。你活着的每一天都像在打卡人生体验清单。",
    traits: ["说走就走", "执行力拉满", "冲动派代表", "体验式人生的信徒"],
    color: "#00b894", bgGradient: "from-green-400 to-teal-500",
    avatar: "/avatars/gogo.png",
    dimensions: {"S1":"H","S2":"M","S3":"H","E1":"M","E2":"M","E3":"M","A1":"M","A2":"L","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"H","So2":"M","So3":"H"},
    mbti: ['ESTP', 'ESFP'],
    similar: ['ctrl', 'boss', 'sexy']
  },
  {
    id: "sexy", code: "#3S", name: "尤物", emoji: "💅",
    slogan: "不是我要散发魅力，是魅力追着我跑。",
    description: "你出门买个菜都能被人要微信，发个自拍评论区就炸了。你觉得自己什么都没做，但就是有一股让人移不开眼的气场。你的秘诀很简单：你真的觉得自己很好看。这份自信，本身就是最强的滤镜。别人的镜子照脸，你的镜子照魅力值。",
    traits: ["魅力值溢出", "自信天花板", "行走的聚光灯", "回头率收割机"],
    color: "#fd79a8", bgGradient: "from-pink-400 to-rose-600",
    avatar: "/avatars/sexy.png",
    dimensions: {"S1":"H","S2":"H","S3":"M","E1":"M","E2":"H","E3":"M","A1":"M","A2":"L","A3":"M","Ac1":"H","Ac2":"M","Ac3":"M","So1":"H","So2":"M","So3":"H"},
    mbti: ['ESTP', 'ESFP'],
    similar: ['boss', 'gogo', 'lover']
  },
  {
    id: "lover", code: "#0L", name: "多情者", emoji: "💕",
    slogan: "对世界心动了999次，哭了1000次。",
    description: "你看个广告都能感动到哭，路边的流浪猫你都觉得它好可爱好可怜要带回家。你的心是那种永远装不满的水杯，装满了还会溢出来。别人说你太敏感，你说是他们太麻木。你用最满的爱意拥抱这个世界，有时候会被世界磕碰，但你下次还是会张开手臂。",
    traits: ["随时被感动", "内心住着诗人", "爱得太满太满", "伤痕累累但依然爱"],
    color: "#e84393", bgGradient: "from-pink-500 to-fuchsia-600",
    avatar: "/avatars/lover.png",
    dimensions: {"S1":"M","S2":"M","S3":"H","E1":"L","E2":"H","E3":"L","A1":"H","A2":"M","A3":"H","Ac1":"M","Ac2":"L","Ac3":"M","So1":"H","So2":"L","So3":"H"},
    mbti: ['ENFP', 'INFP'],
    similar: ['thank', 'atmer', 'ohno']
  },
  {
    id: "mum", code: "#1L", name: "妈妈", emoji: "🤱",
    slogan: "别怕，妈在呢。哦等等我不是你妈...但我可以是的。",
    description: "出远门你带的行李够三个人用，朋友聚会你包揽了订座点菜催买单，团建你是那个偷偷查天气预报提醒大家带伞的人。你操心的范围涵盖宇宙万物，你不累吗？累。但你停不下来，因为万一你不操心了，谁来呢？你是当代社交的底座，有你在，所有人都有安全感。",
    traits: ["操心到宇宙边缘", "出行行李箱是别人的三倍", "人形天气预报", "社交安全网"],
    color: "#fab1a0", bgGradient: "from-orange-300 to-pink-400",
    avatar: "/avatars/mum.png",
    dimensions: {"S1":"M","S2":"H","S3":"H","E1":"H","E2":"H","E3":"L","A1":"M","A2":"H","A3":"H","Ac1":"M","Ac2":"M","Ac3":"H","So1":"H","So2":"L","So3":"H"},
    mbti: ['ESFJ', 'ISFJ'],
    similar: ['thank', 'atmer', 'lover']
  },
  {
    id: "fake", code: "#2L", name: "伪人", emoji: "🤖",
    slogan: "请问人类快乐吗？我好模仿一下。",
    description: "你熟练掌握了36种社交微笑、12种附和话术和8种「对对对你说得对」的语气。你在公司是标准的社畜模板，在朋友面前是人畜无害NPC，在家人面前是省电模式的待机画面。内心深处你时常怀疑：我是不是其实是一段代码？你的精神状态是50%人类+50%人机，剩下50%在装人类。",
    traits: ["演技派", "人机混合体", "打工魂觉醒", "社交全靠剧本"],
    color: "#b2bec3", bgGradient: "from-gray-400 to-slate-500",
    avatar: "/avatars/fake.png",
    dimensions: {"S1":"L","S2":"L","S3":"L","E1":"L","E2":"M","E3":"M","A1":"M","A2":"M","A3":"L","Ac1":"M","Ac2":"M","Ac3":"M","So1":"M","So2":"H","So3":"L"},
    mbti: ['INTP', 'ISTP'],
    similar: ['zzzz', 'ojbk', 'dead']
  },
  {
    id: "ojbk", code: "#3L", name: "无所谓人", emoji: "🤷",
    slogan: "都可以，都行，都OK，我都无所谓。",
    description: "你是这个世界上最佛的存在。吃饭？随便。看电影？随便。去哪旅游？随便。对象找什么样的？都行。你不是没主见，你是真的觉得——算了无所谓了怎样都可以。你的佛系已经进化到了不需要刻意修炼的境界，别人禅修十年才能达到的心境，你天生就有。佛祖看了你都要合十。",
    traits: ["选择困难终极形态", "佛系天花板", "随便是口头禅", "情绪极其稳定（因为没什么情绪）"],
    color: "#a29bfe", bgGradient: "from-violet-300 to-purple-500",
    avatar: "/avatars/ojbk.png",
    dimensions: {"S1":"M","S2":"M","S3":"L","E1":"M","E2":"M","E3":"M","A1":"M","A2":"M","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"M","So2":"M","So3":"L"},
    mbti: ['ISFP', 'INFP'],
    similar: ['zzzz', 'monk', 'fake']
  },
  {
    id: "malo", code: "#0E", name: "吗喽", emoji: "🐒",
    slogan: "吗喽的命也是命。",
    description: "你拒绝参与这场名为「内卷」的饥饿游戏。上班摸鱼是基本操作，下班躺平是生活态度，周末不出门是精神追求。你不是不努力，你是看透了——努力的意义是什么？你的存在就是对「奋斗逼文化」最大的嘲讽。你是一只觉醒的吗喽，正在用自己的方式对抗这个赛博朋克世界。大家都是吗喽，只是有的吗喽不肯承认。",
    traits: ["躺平艺术家", "摸鱼段位王者", "精神状态已升华", "觉醒吗喽"],
    color: "#fdcb6e", bgGradient: "from-yellow-300 to-amber-500",
    avatar: "/avatars/malo.png",
    dimensions: {"S1":"L","S2":"M","S3":"M","E1":"L","E2":"M","E3":"M","A1":"L","A2":"L","A3":"M","Ac1":"M","Ac2":"M","Ac3":"L","So1":"L","So2":"M","So3":"L"},
    mbti: ['INTP', 'INFP'],
    similar: ['diors', 'joker', 'ohno']
  },
  {
    id: "joker", code: "#1E", name: "小丑", emoji: "🤡",
    slogan: "我负责搞笑，谁负责爱我？",
    description: "你是聚会上最活跃的那个人，朋友圈里最会整活的那位，聊天群里永远的快乐源泉。所有人遇到不开心的事都会来找你，因为你能让他们笑。但深夜三点你盯着天花板发呆的时候，没有人问过你开不开心。你用幽默做铠甲，把脆弱藏在每一个段子后面。你是所有人的开心果，唯独不是自己的。",
    traits: ["笑着笑着就哭了", "段子手", "全场的快乐但自己的悲伤", "被所有人需要却没人看穿"],
    color: "#ff6b6b", bgGradient: "from-red-400 to-rose-500",
    avatar: "/avatars/joker.png",
    dimensions: {"S1":"M","S2":"H","S3":"M","E1":"L","E2":"H","E3":"M","A1":"L","A2":"L","A3":"M","Ac1":"M","Ac2":"M","Ac3":"M","So1":"H","So2":"L","So3":"L"},
    mbti: ['ENTP', 'ESTP'],
    similar: ['malo', 'hhhh', 'woc']
  },
  {
    id: "woc", code: "#2E", name: "握草人", emoji: "😱",
    slogan: "卧槽卧槽卧槽——今天又是信息量爆炸的一天。",
    description: "你的日常就像在看一部永远猜不到剧情的连续剧。同事突然辞职——卧槽！朋友居然和前任复合了——卧槽！！食堂今天出了新菜品——卧槽！！！你的精神世界永远处于「震惊」和「更震惊」之间。别人觉得你大惊小怪，你觉得自己只是在真实地活着。毕竟这个世界的离谱程度，值得每天喊八百遍卧槽。",
    traits: ["震惊永动机", "信息量受害者", "吃瓜第一线", "日常就是卧槽"],
    color: "#ffa502", bgGradient: "from-orange-400 to-amber-500",
    avatar: "/avatars/woc.png",
    dimensions: {"S1":"M","S2":"L","S3":"M","E1":"M","E2":"H","E3":"M","A1":"L","A2":"L","A3":"M","Ac1":"H","Ac2":"L","Ac3":"M","So1":"H","So2":"L","So3":"H"},
    mbti: ['ESFP', 'ENFP'],
    similar: ['ohno', 'joker', 'fuck']
  },
  {
    id: "think", code: "#3E", name: "思考者", emoji: "🤔",
    slogan: "想清楚了，但又没完全想清楚。",
    description: "你的浏览器永远开着18个标签页，你的脑内永远在进行8个方向的思考。买个东西你要对比三天，发条消息你要斟酌五分钟，做个决定你需要先写个思维导图。你不是犹豫，你只是在确保万无一失——虽然最后往往还是一样的结果，但至少你想过了。你用思考来对抗世界的随机性。",
    traits: ["思考过载", "决策瘫痪", "脑内世界比现实精彩", "想太多综合症"],
    color: "#0984e3", bgGradient: "from-blue-400 to-indigo-500",
    avatar: "/avatars/think.png",
    dimensions: {"S1":"M","S2":"H","S3":"H","E1":"M","E2":"M","E3":"H","A1":"H","A2":"H","A3":"H","Ac1":"H","Ac2":"M","Ac3":"M","So1":"L","So2":"H","So3":"L"},
    mbti: ['INTJ', 'INTP'],
    similar: ['ctrl', 'monk', 'fake']
  },
  {
    id: "shit", code: "#0D", name: "愤世者", emoji: "💩",
    slogan: "这个世界没救了，但我还活着，真烦。",
    description: "你嘴上说着「这个世界烂透了」「人类没救了」「社会太假了」，然后转头就准时打卡上班、认真完成工作、顺手帮同事带了杯咖啡。你是最典型的刀子嘴豆腐心——骂得最凶的那个，其实最在乎。你的吐槽不是放弃，是另一种形式的热爱。你对这个世界不满，恰恰说明你还期待它变好。",
    traits: ["嘴上毁灭世界", "行动上拯救世界", "吐槽是爱你的方式", "人间清醒但很累"],
    color: "#636e72", bgGradient: "from-gray-500 to-zinc-700",
    avatar: "/avatars/shit.png",
    dimensions: {"S1":"M","S2":"H","S3":"H","E1":"L","E2":"M","E3":"H","A1":"L","A2":"L","A3":"H","Ac1":"H","Ac2":"H","Ac3":"M","So1":"M","So2":"H","So3":"H"},
    mbti: ['ENTP', 'INTJ'],
    similar: ['fuck', 'joker', 'think']
  },
  {
    id: "zzzz", code: "#1D", name: "装死者", emoji: "💀",
    slogan: "我宣布：今日已死，有事请留言。",
    description: "你的精神状态常年徘徊在「植物人」和「冬眠」之间。闹钟响？装死。开会叫你？装死。朋友约出门？装得更死。但奇怪的是，每次最关键的时刻你又能突然满血复活，三分钟搞定别人三小时才能做完的事。你不是懒，你是选择性节能。活着很累的，你只是在用最高效的方式使用自己的电量。",
    traits: ["电量永远低于10%", "选择性满血复活", "躺平也能赢", "人类电量管理大师"],
    color: "#2d3436", bgGradient: "from-gray-700 to-gray-900",
    avatar: "/avatars/zzzz.png",
    dimensions: {"S1":"L","S2":"L","S3":"L","E1":"M","E2":"L","E3":"H","A1":"M","A2":"M","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"L","So2":"H","So3":"L"},
    mbti: ['ISTP', 'ISFP'],
    similar: ['dead', 'fake', 'monk']
  },
  {
    id: "poor", code: "#2D", name: "贫困者", emoji: "😢",
    slogan: "余额：¥3.28。心态：富得流油。",
    description: "你的银行卡余额永远在两位数到三位数之间反复横跳，但你的精神世界比谁都富有。你拥有别人用钱买不到的东西——专一。对一个人专一，对一件事坚持，对一种生活态度执着。别人觉得你穷，你觉得自己只是暂时资金周转不灵。你说得对，因为你的内在价值确实比大多数人值钱。但钱包的事...确实有点痛。",
    traits: ["精神富翁", "口袋空空", "专一到离谱", "待开发的宝藏"],
    color: "#6c5ce7", bgGradient: "from-indigo-400 to-purple-600",
    avatar: "/avatars/poor.png",
    dimensions: {"S1":"M","S2":"H","S3":"H","E1":"M","E2":"M","E3":"H","A1":"M","A2":"H","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"M","So2":"H","So3":"M"},
    mbti: ['ISTJ', 'INTJ'],
    similar: ['ctrl', 'think', 'monk']
  },
  {
    id: "monk", code: "#3D", name: "僧人", emoji: "🧘",
    slogan: "四大皆空，五蕴皆空，钱包也空。",
    description: "你是当代都市中最接近开悟的存在。升职？不感兴趣。加薪？可以但无所谓。恋爱？随缘。你的朋友圈半年更新一次，微信置顶是「文件传输助手」。别人焦虑的你不焦虑，别人追求的你没感觉。不是你看破红尘，是你真的不觉得红尘有什么值得留恋的。你是这个时代最稀缺的存在——一个真的不在意的人。",
    traits: ["真正的佛系", "欲望值为负", "精神境界降维打击", "人类高质量淡人"],
    color: "#dfe6e9", bgGradient: "from-slate-200 to-gray-400",
    avatar: "/avatars/monk.png",
    dimensions: {"S1":"M","S2":"H","S3":"M","E1":"H","E2":"L","E3":"H","A1":"H","A2":"H","A3":"H","Ac1":"L","Ac2":"M","Ac3":"M","So1":"L","So2":"H","So3":"M"},
    mbti: ['INFJ', 'INTJ'],
    similar: ['think', 'poor', 'zzzz']
  },
  {
    id: "imsb", code: "#0F", name: "傻者", emoji: "🤪",
    slogan: "别人笑我太疯癫，我笑别人看不穿。",
    description: "你是那种敢在领导面前讲冷笑话、敢在陌生人面前做自己的奇人。你不是傻，你是太真实了——真实到这个虚伪的世界都不太适应你。别人在算计利益的时候你在想中午吃什么，别人在经营人脉的时候你在研究怎么养活阳台上的仙人掌。你的「傻」是一种超能力，让你活成了别人不敢活的样子。",
    traits: ["人间真实", "不装是最高级的装", "快乐很简单", "活成了别人的理想型"],
    color: "#a29bfe", bgGradient: "from-purple-300 to-indigo-400",
    avatar: "/avatars/imsb.png",
    dimensions: {"S1":"L","S2":"L","S3":"L","E1":"L","E2":"M","E3":"L","A1":"L","A2":"L","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"M","So2":"L","So3":"M"},
    mbti: ['INFP', 'ISFP'],
    similar: ['ohno', 'dead', 'malo']
  },
  {
    id: "solo", code: "#1F", name: "孤儿", emoji: "🥺",
    slogan: "我好像一直一个人...不是好像，就是。",
    description: "你是人群中那个安静看着别人笑的人。你也会笑，但总觉得隔着一层什么东西。你渴望被理解，但又害怕被看穿。你渴望亲密关系，但又觉得维持关系好累。你在热闹中感到最深的孤独，在独处时反而最自在。你不是不需要朋友，你只是还没遇到那个让你愿意走出舒适区的人。会来的，再等等。",
    traits: ["孤独美学", "慢热到结冰", "内心戏比电影还多", "等一个同频的人"],
    color: "#74b9ff", bgGradient: "from-blue-300 to-sky-500",
    avatar: "/avatars/solo.png",
    dimensions: {"S1":"M","S2":"M","S3":"M","E1":"L","E2":"L","E3":"H","A1":"M","A2":"M","A3":"M","Ac1":"M","Ac2":"M","Ac3":"M","So1":"L","So2":"H","So3":"L"},
    mbti: ['INTP', 'ISTP'],
    similar: ['monk', 'zzzz', 'fake']
  },
  {
    id: "fuck", code: "#2F", name: "草者", emoji: "🤬",
    slogan: "我就直说了，别不爱听。",
    description: "你是那个在所有人都在含蓄表达的时候直接掀桌子的人。领导画饼你说「饼太小了不够吃」，同事甩锅你说「锅太烫了别甩我这」。你的嘴比你的脑子快0.5秒，得罪人的效率比交朋友的效率高十倍。但奇怪的是，真正了解你的人，都特别珍惜你——因为这个世界上敢说真话的人，真的不多了。",
    traits: ["嘴比脑快", "真话制造机", "社交地雷", "得罪人但大家都佩服"],
    color: "#e17055", bgGradient: "from-red-400 to-orange-500",
    avatar: "/avatars/fuck.png",
    dimensions: {"S1":"M","S2":"H","S3":"H","E1":"L","E2":"H","E3":"H","A1":"L","A2":"L","A3":"H","Ac1":"H","Ac2":"H","Ac3":"H","So1":"H","So2":"M","So3":"H"},
    mbti: ['ENTP', 'ESTP'],
    similar: ['shit', 'joker', 'woc']
  },
  {
    id: "dead", code: "#3F", name: "死者", emoji: "☠️",
    slogan: "今天也是不想起床的一天。算了，也不想起。",
    description: "你的灵魂大概在上辈子就已经把这辈子过完了，这辈子纯属来走个过场。每天的日出对你来说是「又一个循环开始了」，每天的日落是「终于又结束一个循环了」。你的日历上没有值得期待的日子，但你依然在呼吸、在吃饭、在刷手机——这本身，就已经是一种了不起的坚持了。活着本身就是你最大的勇敢。",
    traits: ["灵魂已下班", "肉体自动模式", "等待什么但不知道等什么", "还在坚持就是胜利"],
    color: "#2d3436", bgGradient: "from-zinc-800 to-black",
    avatar: "/avatars/dead.png",
    dimensions: {"S1":"L","S2":"L","S3":"L","E1":"L","E2":"L","E3":"M","A1":"L","A2":"M","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"L","So2":"M","So3":"L"},
    mbti: ['INFP', 'ISFP'],
    similar: ['imsb', 'zzzz', 'fake']
  },
  {
    id: "imfw", code: "#0W", name: "废物", emoji: "🗑️",
    slogan: "我废物本废，但我在努力。",
    description: "你每天起床的第一件事就是自我怀疑，最后一件事还是自我怀疑。你觉得自己不够好看、不够聪明、不够有趣、不够...什么都不够。但你知道吗？一个会觉得自己「什么都不够」的人，恰恰说明你的标准很高、你的追求很远。你不是废物，你是一颗还没找到合适土壤的种子。别急，花期不同而已。",
    traits: ["自我否定专业户", "其实是完美主义", "内耗到需要充电", "值得被好好爱一次"],
    color: "#b2bec3", bgGradient: "from-gray-300 to-slate-500",
    avatar: "/avatars/imfw.png",
    dimensions: {"S1":"L","S2":"L","S3":"M","E1":"L","E2":"L","E3":"M","A1":"L","A2":"M","A3":"L","Ac1":"L","Ac2":"L","Ac3":"L","So1":"L","So2":"M","So3":"L"},
    mbti: ['ISFP', 'INFP'],
    similar: ['dead', 'imsb', 'ohno']
  },
  {
    id: "hhhh", code: "#1W", name: "傻乐者", emoji: "😄",
    slogan: "笑就完了，想那么多干嘛？",
    description: "你是那个看个搞笑视频能笑到缺氧、走在路上想到什么就突然傻笑、朋友心情不好你一出现气氛就活过来的人。你的快乐不是因为没心没肺，而是因为你选择了快乐。生活那么难了，再不笑一笑岂不是亏大了？你是人间的快乐催化剂，你不需要理由就能开心，这种能力本身就是一种天才。",
    traits: ["快乐永动机", "气氛组组长", "笑点极低", "人间充电宝"],
    color: "#ffeaa7", bgGradient: "from-yellow-200 to-amber-300",
    avatar: "/avatars/hhhh.png",
    dimensions: {"S1":"H","S2":"M","S3":"M","E1":"H","E2":"H","E3":"M","A1":"H","A2":"L","A3":"M","Ac1":"H","Ac2":"M","Ac3":"M","So1":"H","So2":"L","So3":"H"},
    mbti: ['ESFP', 'ENFP'],
    similar: ['joker', 'gogo', 'sexy']
  },
  {
    id: "drunk", code: "#2W", name: "酒鬼", emoji: "🍺",
    slogan: "清醒太痛了，来一杯。",
    description: "你不是爱喝酒，你只是需要一个理由不那么清醒。你的故事比酒还烈，你的眼泪比酒还苦，你笑着碰杯的时候没人知道你在想什么。白天的你是另一个人的样子——体面、克制、彬彬有礼。但到了深夜，卸下所有的你，才最真实。你不需要戒酒，你需要一个能让你清醒着也快乐的人。",
    traits: ["夜行性生物", "故事比酒还多", "白天一个人晚上另一个人", "需要被温柔以待"],
    color: "#d63031", bgGradient: "from-red-600 to-red-800",
    avatar: "/avatars/drunk.png",
    dimensions: {"S1":"L","S2":"M","S3":"M","E1":"L","E2":"H","E3":"L","A1":"L","A2":"L","A3":"M","Ac1":"M","Ac2":"L","Ac3":"L","So1":"H","So2":"L","So3":"H"},
    mbti: ['ENFP', 'ISFP'],
    similar: ['lover', 'joker', 'ohno']
  }
];

// Quiz Questions
export interface Question {
  id: number;
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "早上闹钟响了，你的第一反应是？",
    options: [
      { label: "关掉，再睡5分钟（然后迟到）", scores: { zzzz: 3, dead: 2, malo: 1 } },
      { label: "弹射起床，元气满满！", scores: { gogo: 3, hhhh: 2, sexy: 1 } },
      { label: "看了眼手机，叹了口气", scores: { fake: 2, poor: 2, imsb: 1 } },
      { label: "闹钟？我根本没设闹钟", scores: { dead: 3, zzzz: 2, solo: 1 } },
    ]
  },
  {
    id: 2,
    text: "朋友约你周末出去玩，你会？",
    options: [
      { label: "马上答应，开始研究攻略", scores: { gogo: 3, ctrl: 2, lover: 1 } },
      { label: "可以，但我不知道去哪", scores: { ojbk: 3, mum: 1, fake: 1 } },
      { label: "假装没看到消息", scores: { solo: 3, zzzz: 2, monk: 1 } },
      { label: "可以啊，但我不想出门...", scores: { malo: 3, fake: 2, dead: 1 } },
    ]
  },
  {
    id: 3,
    text: "被同事甩锅了，你的反应是？",
    options: [
      { label: "当场怼回去", scores: { fuck: 3, shit: 2, boss: 1 } },
      { label: "默默接受，然后在心里记仇", scores: { joker: 3, fake: 2, imfw: 1 } },
      { label: "冷静分析，搜集证据反击", scores: { ctrl: 3, boss: 2, think: 1 } },
      { label: "算了，我背就我背吧", scores: { atmer: 3, mum: 2, imfw: 1 } },
    ]
  },
  {
    id: 4,
    text: "一个人的晚上，你最可能在做？",
    options: [
      { label: "刷手机到凌晨3点", scores: { dead: 3, fake: 2, imfw: 1 } },
      { label: "喝酒，顺便思考人生", scores: { drunk: 3, shit: 2, solo: 1 } },
      { label: "看剧/打游戏/做任何快乐的事", scores: { hhhh: 3, malo: 2, woc: 1 } },
      { label: "躺在床上发呆，想东想西", scores: { lover: 3, solo: 2, imsb: 1 } },
    ]
  },
  {
    id: 5,
    text: "你觉得自己在朋友圈里是什么角色？",
    options: [
      { label: "气氛担当，没有我不热闹", scores: { hhhh: 3, joker: 2, sexy: 1 } },
      { label: "操心担当，什么都管", scores: { mum: 3, ctrl: 2, atmer: 1 } },
      { label: "存在感担当...虽然没人发现", scores: { solo: 3, dead: 2, imfw: 1 } },
      { label: "摇钱树担当，请我吃饭", scores: { atmer: 3, diors: 2, poor: 1 } },
    ]
  },
  {
    id: 6,
    text: "面对不熟悉的人，你通常？",
    options: [
      { label: "主动打招呼，自来熟", scores: { sexy: 3, gogo: 2, lover: 1 } },
      { label: "等对方先开口", scores: { ojbk: 2, fake: 2, think: 1 } },
      { label: "装作在忙手机", scores: { fake: 3, zzzz: 1, dead: 1 } },
      { label: "内心已经想好了一百个话题但就是不说", scores: { lover: 3, think: 2, imfw: 1 } },
    ]
  },
  {
    id: 7,
    text: "看到朋友发了一条很伤感的动态，你会？",
    options: [
      { label: "立刻私信问怎么了", scores: { mum: 3, lover: 2, atmer: 1 } },
      { label: "默默点赞，不打扰", scores: { monk: 2, fake: 2, ojbk: 1 } },
      { label: "评论一个表情包化解气氛", scores: { joker: 3, hhhh: 2, woc: 1 } },
      { label: "看了一眼就滑走了", scores: { shit: 2, dead: 2, imfw: 1 } },
    ]
  },
  {
    id: 8,
    text: "买东西时的你？",
    options: [
      { label: "大手大脚，先买了再说", scores: { atmer: 3, gogo: 1, woc: 1 } },
      { label: "疯狂比价，研究三天才下单", scores: { poor: 3, think: 2, ctrl: 1 } },
      { label: "需要吗？不需要。买不买？买！", scores: { imfw: 2, imsb: 2, atmer: 1 } },
      { label: "逛了半天，最后什么都没买", scores: { diors: 2, poor: 2, imfw: 1 } },
    ]
  },
  {
    id: 9,
    text: "深夜emo的时候你在想什么？",
    options: [
      { label: "为什么我这么穷？", scores: { poor: 3, diors: 2, shit: 1 } },
      { label: "为什么没有人懂我？", scores: { solo: 3, joker: 2, lover: 1 } },
      { label: "我的人生就这样了吗？", scores: { dead: 3, fake: 2, imfw: 1 } },
      { label: "我没有emo，我在打游戏", scores: { malo: 3, hhhh: 2, monk: 1 } },
    ]
  },
  {
    id: 10,
    text: "理想的生活状态是？",
    options: [
      { label: "财务自由，想去哪去哪", scores: { diors: 2, gogo: 2, boss: 1 } },
      { label: "有人陪，有事做，有期待", scores: { lover: 3, mum: 1, thank: 1 } },
      { label: "一个人，安静，不被人打扰", scores: { monk: 3, solo: 2, dead: 1 } },
      { label: "不用上班就行", scores: { malo: 3, dead: 2, zzzz: 1 } },
    ]
  },
  {
    id: 11,
    text: "有人当众夸你，你会？",
    options: [
      { label: "从容接受，保持微笑", scores: { ctrl: 3, sexy: 2, boss: 1 } },
      { label: "不好意思到脸红", scores: { imfw: 3, imsb: 2, lover: 1 } },
      { label: "立刻回夸对方", scores: { joker: 2, mum: 2, atmer: 1 } },
      { label: "心里美滋滋但嘴上说没有没有", scores: { imsb: 3, fake: 2, ojbk: 1 } },
    ]
  },
  {
    id: 12,
    text: "你的手机相册里最多的是什么？",
    options: [
      { label: "自拍（修过的）", scores: { sexy: 3, lover: 1, hhhh: 1 } },
      { label: "美食照片", scores: { hhhh: 3, malo: 2, woc: 1 } },
      { label: "截图（各种聊天记录/梗图）", scores: { shit: 2, joker: 2, woc: 1 } },
      { label: "几乎不拍照", scores: { monk: 3, zzzz: 2, dead: 1 } },
    ]
  },
  {
    id: 13,
    text: "下班后的真实状态？",
    options: [
      { label: "瘫在床上，手机举过头顶", scores: { dead: 3, zzzz: 2, malo: 1 } },
      { label: "约朋友吃饭喝酒", scores: { drunk: 2, gogo: 2, sexy: 1 } },
      { label: "继续工作（不是卷，是真的没做完）", scores: { fake: 3, boss: 2, imfw: 1 } },
      { label: "报复性熬夜，明天再后悔", scores: { imsb: 3, dead: 2, joker: 1 } },
    ]
  },
  {
    id: 14,
    text: "你最受不了什么样的人？",
    options: [
      { label: "阴阳怪气的", scores: { fuck: 3, shit: 2, ctrl: 1 } },
      { label: "不懂装懂的", scores: { think: 3, ctrl: 2, shit: 1 } },
      { label: "爱秀优越感的", scores: { diors: 3, shit: 2, drunk: 1 } },
      { label: "没有边界感的", scores: { solo: 3, monk: 2, fake: 1 } },
    ]
  },
  {
    id: 15,
    text: "如果你中了500万，第一件事？",
    options: [
      { label: "先还清所有贷款", scores: { poor: 3, diors: 2, think: 1 } },
      { label: "请所有朋友吃大餐", scores: { atmer: 3, hhhh: 2, lover: 1 } },
      { label: "辞职，再也不上了", scores: { malo: 3, dead: 2, gogo: 1 } },
      { label: "装作什么都没发生", scores: { ctrl: 2, monk: 2, boss: 1 } },
    ]
  },
  {
    id: 16,
    text: "你在团队中通常扮演什么角色？",
    options: [
      { label: "决策者，说了算", scores: { boss: 3, ctrl: 2, diors: 1 } },
      { label: "执行者，让我来", scores: { mum: 3, malo: 2, atmer: 1 } },
      { label: "军师，我来分析", scores: { think: 3, ctrl: 2, fake: 1 } },
      { label: "气氛组，我负责加油", scores: { hhhh: 3, joker: 2, woc: 1 } },
    ]
  },
  {
    id: 17,
    text: "面对一个完全不会的任务，你会？",
    options: [
      { label: "硬上，不会就学", scores: { gogo: 3, boss: 2, diors: 1 } },
      { label: "找人帮忙", scores: { atmer: 2, mum: 2, lover: 1 } },
      { label: "先拖延再说", scores: { dead: 3, zzzz: 2, malo: 1 } },
      { label: "查资料研究到天亮", scores: { think: 3, imfw: 2, ctrl: 1 } },
    ]
  },
  {
    id: 18,
    text: "你的微信签名/个性签名是什么风格？",
    options: [
      { label: "没有签名，空白", scores: { monk: 2, fake: 2, dead: 1 } },
      { label: "一句很文艺/很有深度的话", scores: { lover: 2, solo: 2, think: 1 } },
      { label: "搞笑/自嘲/网络热梗", scores: { joker: 3, imsb: 2, hhhh: 1 } },
      { label: "经常换，看心情", scores: { sexy: 2, woc: 2, fuck: 1 } },
    ]
  },
  {
    id: 19,
    text: "你最想对说的一句话是？",
    options: [
      { label: "对自己：辛苦了", scores: { imfw: 3, solo: 2, joker: 1 } },
      { label: "对朋友：谢谢你们", scores: { thank: 3, lover: 2, mum: 1 } },
      { label: "对老板：我不干了", scores: { malo: 3, dead: 2, fuck: 2 } },
      { label: "对世界：你欠我的", scores: { shit: 3, drunk: 2, diors: 1 } },
    ]
  },
  {
    id: 20,
    text: "恋爱中的你是什么样的？",
    options: [
      { label: "全身心投入，爱得很满", scores: { lover: 3, atmer: 2, mum: 1 } },
      { label: "佛系，有就好好谈，没有也行", scores: { ojbk: 3, monk: 2, solo: 1 } },
      { label: "嘴上不在意，心里想很多", scores: { fake: 3, think: 2, imsb: 1 } },
      { label: "恋爱？什么是恋爱？", scores: { dead: 3, malo: 2, solo: 1 } },
    ]
  },
  {
    id: 21,
    text: "以下哪句话最能代表你？",
    options: [
      { label: "我很强，我知道", scores: { boss: 3, sexy: 2, ctrl: 1 } },
      { label: "我很菜，我也知道", scores: { imfw: 3, imsb: 2, ohno: 1 } },
      { label: "我不知道我强不强", scores: { think: 2, fake: 2, ojbk: 1 } },
      { label: "强不强有什么关系", scores: { monk: 3, malo: 2, hhhh: 1 } },
    ]
  },
  {
    id: 22,
    text: "你觉得自己最大的优点是？",
    options: [
      { label: "真诚善良", scores: { atmer: 2, mum: 2, thank: 1 } },
      { label: "聪明有脑子", scores: { ctrl: 2, think: 2, boss: 1 } },
      { label: "好相处不记仇", scores: { hhhh: 2, ojbk: 2, mum: 1 } },
      { label: "我...有优点吗？", scores: { imfw: 3, ohno: 2, imsb: 1 } },
    ]
  },
  {
    id: 23,
    text: "别人借你钱不还，你会？",
    options: [
      { label: "不好意思开口要", scores: { imfw: 3, atmer: 2, fake: 1 } },
      { label: "直接催，不还就翻脸", scores: { fuck: 3, boss: 2, ctrl: 1 } },
      { label: "在朋友圈发暗示性内容", scores: { joker: 3, shit: 2, lover: 1 } },
      { label: "算了，就当送了", scores: { atmer: 3, monk: 2, thank: 1 } },
    ]
  },
  {
    id: 24,
    text: "你觉得哪种死法最你？",
    options: [
      { label: "笑着走的", scores: { hhhh: 3, joker: 2, lover: 1 } },
      { label: "躺平走的", scores: { zzzz: 3, malo: 2, dead: 1 } },
      { label: "战斗到最后一刻", scores: { boss: 3, gogo: 2, diors: 1 } },
      { label: "这个话题太沉重了，下一个", scores: { ohno: 2, fake: 2, imsb: 1 } },
    ]
  },
  {
    id: 25,
    text: "如果用一个词形容你的人生？",
    options: [
      { label: "还行", scores: { ojbk: 3, monk: 2, fake: 1 } },
      { label: "太难了", scores: { shit: 2, dead: 2, drunk: 1 } },
      { label: "刺激", scores: { woc: 3, gogo: 2, sexy: 1 } },
      { label: "哈哈哈哈哈", scores: { hhhh: 3, joker: 2, imsb: 1 } },
    ]
  },
  {
    id: 26,
    text: "你上一次发自内心地笑是什么时候？",
    options: [
      { label: "刚才", scores: { hhhh: 3, malo: 2, sexy: 1 } },
      { label: "想不起来了", scores: { dead: 3, joker: 2, imfw: 1 } },
      { label: "看到这个测试的时候", scores: { imsb: 3, woc: 2, ohno: 1 } },
      { label: "和朋友在一起的时候", scores: { lover: 2, mum: 2, thank: 1 } },
    ]
  },
  {
    id: 27,
    text: "你觉得自己是MBTI中的什么类型？（蒙的也算）",
    options: [
      { label: "E人，社交悍匪", scores: { sexy: 2, gogo: 2, hhhh: 1 } },
      { label: "I人，社恐天花板", scores: { solo: 3, dead: 1, zzzz: 1 } },
      { label: "T人，理性怪物", scores: { ctrl: 3, think: 2, shit: 1 } },
      { label: "F人，情感泛滥", scores: { lover: 3, mum: 2, joker: 1 } },
    ]
  },
  {
    id: 28,
    text: "测完这个测试后你会？",
    options: [
      { label: "发朋友圈炫耀", scores: { sexy: 3, woc: 2, ctrl: 1 } },
      { label: "默默截图自己看", scores: { solo: 3, imfw: 2, dead: 1 } },
      { label: "拉着朋友一起测", scores: { hhhh: 3, gogo: 2, mum: 1 } },
      { label: "测完就忘了", scores: { ojbk: 3, monk: 2, malo: 1 } },
    ]
  },
  {
    id: 29,
    text: "最后，你觉得你的人格应该是？",
    options: [
      { label: "最酷的那个", scores: { sexy: 2, boss: 2, ctrl: 1 } },
      { label: "最搞笑的那个", scores: { joker: 3, hhhh: 2, imsb: 1 } },
      { label: "最惨的那个", scores: { dead: 2, poor: 2, imfw: 1 } },
      { label: "随便什么，我不在乎", scores: { ojbk: 3, monk: 2, malo: 1 } },
    ]
  },
  {
    id: 30,
    text: "隐藏题目：你觉得这个测试准吗？",
    options: [
      { label: "准到离谱！", scores: { woc: 3, ohno: 2, imsb: 1 } },
      { label: "不准，但好玩", scores: { shit: 2, hhhh: 2, ctrl: 1 } },
      { label: "我拒绝回答这个问题", scores: { fake: 2, monk: 2, fuck: 1 } },
      { label: "反正测出来肯定是最惨的那个", scores: { dead: 2, imfw: 2, joker: 1 } },
    ]
  },
  {
    id: 31,
    text: "恭喜你做到最后一题！说一句想说的话吧：",
    options: [
      { label: "终于结束了！", scores: { zzzz: 2, dead: 2, gogo: 1 } },
      { label: "还想再来一次", scores: { hhhh: 2, woc: 2, imsb: 1 } },
      { label: "快给我结果！", scores: { fuck: 2, boss: 2, ctrl: 1 } },
      { label: "...（沉默）", scores: { solo: 3, monk: 2, dead: 1 } },
    ]
  },
  // ===== 新增题库（id 32 起）=====  重写版：网络热梗+疯癫有趣
  {
    id: 32,
    text: "外卖小哥把你的黄焖鸡送成了隔壁老王的螺蛳粉，你？",
    options: [
      { label: "螺蛳粉就螺蛳粉吧，命运的安排", scores: { ojbk: 3, zzzz: 2, fake: 1 } },
      { label: "打电话让小哥给我换回来！黄焖鸡在召唤我！", scores: { ctrl: 2, boss: 2, poor: 1 } },
      { label: "拍照发朋友圈：今天被命运调包了", scores: { woc: 3, joker: 2, shit: 1 } },
      { label: "小哥风里来雨里去的...算了算了，螺蛳粉也香", scores: { atmer: 2, thank: 2, mum: 1 } },
    ]
  },
  {
    id: 33,
    text: "KTV局你通常在干嘛？",
    options: [
      { label: "话筒焊手上，这首我来！", scores: { sexy: 3, boss: 2, hhhh: 1 } },
      { label: "缩在角落刷手机等有人叫我才动", scores: { solo: 3, dead: 2, fake: 1 } },
      { label: "点歌切歌递话筒端茶倒水...我好像服务员", scores: { mum: 3, atmer: 2, thank: 1 } },
      { label: "坐在暗处喝着酒，看着他们疯，想起些有的没的", scores: { drunk: 3, lover: 2, think: 1 } },
    ]
  },
  {
    id: 34,
    text: "群聊冷场王发了个冻死人的冷笑话，你？",
    options: [
      { label: "哈哈哈哈笑到肚子疼！我是真觉得好笑", scores: { hhhh: 3, woc: 2, imsb: 1 } },
      { label: "反手接一个更冷的，看谁先冻死", scores: { joker: 3, malo: 2, fuck: 1 } },
      { label: "已读，就当没看见", scores: { monk: 3, solo: 2, dead: 1 } },
      { label: "发个表情包假装我笑了", scores: { fake: 2, ojbk: 2, thank: 1 } },
    ]
  },
  {
    id: 35,
    text: "你电脑突然蓝屏了，此刻你的灵魂在？",
    options: [
      { label: "啊啊啊啊我写了一下午的PPT啊啊啊啊！！！", scores: { ohno: 3, woc: 2, imfw: 1 } },
      { label: "嗯...冷静，重启大法好", scores: { ctrl: 3, think: 2, monk: 1 } },
      { label: "太好了，这是宇宙在告诉我今天不用干活", scores: { malo: 3, zzzz: 2, dead: 1 } },
      { label: "疯狂回忆上次备份是哪辈子的事了", scores: { poor: 2, think: 2, mum: 1 } },
    ]
  },
  {
    id: 36,
    text: "你跟人聊天更想用哪种姿势？",
    options: [
      { label: "语音连发！打字太慢了跟不上我嘴", scores: { gogo: 3, sexy: 2, boss: 1 } },
      { label: "打字，每个字都能斟酌三遍再发", scores: { think: 3, fake: 2, solo: 1 } },
      { label: "表情包才是我的母语", scores: { hhhh: 3, joker: 2, imsb: 1 } },
      { label: "能不聊就不聊，求你别找我", scores: { monk: 3, solo: 2, dead: 1 } },
    ]
  },
  {
    id: 37,
    text: "有人说你变了，你的内心戏是？",
    options: [
      { label: "啊？哪里变了？我改我改还不行吗", scores: { imfw: 3, thank: 2, ohno: 1 } },
      { label: "废话，人不变还是人吗", scores: { ctrl: 2, monk: 2, ojbk: 1 } },
      { label: "等等，我变好了还是变坏了？这个很关键", scores: { think: 3, lover: 2, fake: 1 } },
      { label: "关你啥事？你管得着吗？", scores: { fuck: 3, shit: 2, sexy: 1 } },
    ]
  },
  {
    id: 38,
    text: "路过一面玻璃墙，你会？",
    options: [
      { label: "停下来欣赏一下这个走路的艺术品", scores: { sexy: 3, hhhh: 2, gogo: 1 } },
      { label: "低头走过去，别让我看见自己", scores: { imfw: 3, dead: 2, solo: 1 } },
      { label: "照一下确认发型没乱，打工人的体面", scores: { fake: 2, ctrl: 2, mum: 1 } },
      { label: "对着自己做个鬼脸然后笑出声", scores: { imsb: 3, joker: 2, malo: 1 } },
    ]
  },
  {
    id: 39,
    text: "突然下暴雨你没带伞，你的选择是？",
    options: [
      { label: "冲！！！跑起来感觉自己就是电影主角", scores: { gogo: 3, diors: 2, imsb: 1 } },
      { label: "找个屋檐蹲着，跟其他落难人类一起等", scores: { think: 2, ojbk: 2, monk: 1 } },
      { label: "淋就淋呗，反正也不差这一场", scores: { dead: 3, malo: 2, monk: 1 } },
      { label: "立刻掏手机打车/叫跑腿送伞，钱能解决的事都不叫事", scores: { ctrl: 2, poor: 2, boss: 1 } },
    ]
  },
  {
    id: 40,
    text: "手机只剩5%电了，你的求生欲？",
    options: [
      { label: "疯狂找充电器！谁有充电器！！借我！！", scores: { ohno: 3, woc: 2, imfw: 1 } },
      { label: "冷静关掉所有后台，低电量模式开启，精确计算到家还剩多少", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "没电就没电吧，正好戒手机", scores: { monk: 3, ojbk: 2, dead: 1 } },
      { label: "趁还有电赶紧发条朋友圈：5%的告白", scores: { sexy: 2, hhhh: 2, woc: 1 } },
    ]
  },
  {
    id: 41,
    text: "你打工的节奏更像？",
    options: [
      { label: "打仗一样，效率拉满，我完事别人还在热身", scores: { boss: 3, gogo: 2, ctrl: 1 } },
      { label: "磨刀不误砍柴工，慢工出细活懂不懂", scores: { think: 3, monk: 2, poor: 1 } },
      { label: "看心情，今天精神好就多干点", scores: { malo: 3, ojbk: 2, fake: 1 } },
      { label: "deadline才是我的真正老板，不到最后关头我是废物", scores: { zzzz: 3, dead: 2, joker: 1 } },
    ]
  },
  {
    id: 42,
    text: "好朋友生日你送啥？",
    options: [
      { label: "提前一个月开始挑，包装必须仪式感拉满", scores: { mum: 3, thank: 2, lover: 1 } },
      { label: "红包最实在，感情到了就行", scores: { ctrl: 2, poor: 2, ojbk: 1 } },
      { label: "转账加句生日快乐，完事", scores: { fake: 2, solo: 2, dead: 1 } },
      { label: "整一场他们猜不到的惊喜局！", scores: { hhhh: 3, atmer: 2, gogo: 1 } },
    ]
  },
  {
    id: 43,
    text: "深夜emo发了条伤感朋友圈，第二天醒来你？",
    options: [
      { label: "秒删！！！社死现场！！！当什么都没发生", scores: { ohno: 3, imfw: 2, fake: 1 } },
      { label: "发都发了，删什么删，我说的就是真话", scores: { fuck: 3, shit: 2, monk: 1 } },
      { label: "赶紧设成仅自己可见，留个深夜的自己看", scores: { solo: 3, think: 2, lover: 1 } },
      { label: "我从来不发伤感动态，丢不起那个人", scores: { ctrl: 2, hhhh: 2, monk: 1 } },
    ]
  },
  {
    id: 44,
    text: "如果必须投胎成一种动物？",
    options: [
      { label: "猫，独居大佬，想撸人时才赏脸", scores: { solo: 3, sexy: 2, monk: 1 } },
      { label: "狗，快乐傻白甜，有主人就行", scores: { lover: 3, atmer: 2, mum: 1 } },
      { label: "树懒，人生信条就是不动", scores: { dead: 3, zzzz: 2, malo: 1 } },
      { label: "狐狸，聪明绝顶还能骗人", scores: { ctrl: 3, think: 2, joker: 1 } },
    ]
  },
  {
    id: 45,
    text: "工资卡突然多了一笔来路不明的钱，你？",
    options: [
      { label: "先存起来！万一是要还的", scores: { poor: 3, think: 2, ctrl: 1 } },
      { label: "请客！家人们走起！", scores: { atmer: 3, hhhh: 2, thank: 1 } },
      { label: "那个我想了很久的东西终于可以买了", scores: { gogo: 2, sexy: 2, diors: 1 } },
      { label: "先查清楚这钱哪来的，天上不会掉馅饼", scores: { ctrl: 2, fake: 2, think: 1 } },
    ]
  },
  {
    id: 46,
    text: "聚会有人开了个黄腔，你的反应？",
    options: [
      { label: "笑得最大声那个就是我", scores: { hhhh: 3, woc: 2, joker: 1 } },
      { label: "接一个更猛的，看看谁先脸红", scores: { fuck: 3, joker: 2, malo: 1 } },
      { label: "假装听不懂...我在哪我是谁", scores: { fake: 3, imfw: 2, ohno: 1 } },
      { label: "尴尬地笑笑然后假装在看手机", scores: { mum: 2, thank: 2, solo: 1 } },
    ]
  },
  {
    id: 47,
    text: "你在路上摔了个狗吃屎，第一反应？",
    options: [
      { label: "先环顾四周确认没人看到", scores: { fake: 3, sexy: 2, ohno: 1 } },
      { label: "弹射起步，假装在跑步", scores: { ctrl: 3, boss: 2, gogo: 1 } },
      { label: "趴在地上思考三秒人生再起来", scores: { dead: 3, malo: 2, drunk: 1 } },
      { label: "笑出声来哈哈哈哈我也太搞了", scores: { hhhh: 3, imsb: 2, joker: 1 } },
    ]
  },
  {
    id: 48,
    text: "你最怕被什么？",
    options: [
      { label: "被误解——我说的是A你听成B然后全世界都以为我是那个意思", scores: { lover: 3, fake: 2, solo: 1 } },
      { label: "被忽视——我在群里说了个笑话没人理", scores: { joker: 3, ohno: 2, imfw: 1 } },
      { label: "被控制——别安排我！我自己来！", scores: { fuck: 3, solo: 2, gogo: 1 } },
      { label: "被看穿——万一别人发现我其实啥也不是", scores: { fake: 3, ctrl: 2, drunk: 1 } },
    ]
  },
  {
    id: 49,
    text: "给你贴个社交标签你选哪个？",
    options: [
      { label: "社牛本牛，走到哪嗨到哪", scores: { sexy: 3, hhhh: 2, gogo: 1 } },
      { label: "社恐天花板，能不见人就不见人", scores: { solo: 3, dead: 2, imfw: 1 } },
      { label: "社杂选手，看人下菜碟", scores: { fake: 3, think: 2, ojbk: 1 } },
      { label: "社交刺客——看着安静一开口吓死人", scores: { joker: 3, malo: 2, woc: 1 } },
    ]
  },
  {
    id: 50,
    text: "哪种同事让你想掀桌？",
    options: [
      { label: "甩锅侠——出了事第一个缩头", scores: { fuck: 3, ctrl: 2, shit: 1 } },
      { label: "马屁精——老板放个屁他能说成交响乐", scores: { shit: 3, diors: 2, think: 1 } },
      { label: "卷王——你下班他加班，搞得全组不得不陪", scores: { malo: 3, dead: 2, zzzz: 1 } },
      { label: "话痨——能不能闭嘴让我安静待五分钟", scores: { solo: 3, monk: 2, zzzz: 1 } },
    ]
  },
  {
    id: 51,
    text: "你周末的真实打开方式？",
    options: [
      { label: "出门浪，一周七天不够我安排的", scores: { gogo: 3, sexy: 2, hhhh: 1 } },
      { label: "躺在床上手机举过头顶，外卖是唯一的访客", scores: { dead: 3, malo: 2, zzzz: 1 } },
      { label: "处理周一到周五拖下来的各种破事", scores: { fake: 3, poor: 2, mum: 1 } },
      { label: "追剧发呆喝茶，享受与世隔绝", scores: { solo: 3, think: 2, monk: 1 } },
    ]
  },
  {
    id: 52,
    text: "有人在群里@你但你完全不认识他，你？",
    options: [
      { label: "直接回：怎么了兄弟？", scores: { gogo: 3, atmer: 2, hhhh: 1 } },
      { label: "假装没看见，我已遁入虚空", scores: { solo: 3, dead: 2, fake: 1 } },
      { label: "先翻翻他朋友圈侦探一下这人是谁", scores: { think: 3, ctrl: 2, joker: 1 } },
      { label: "回个？表情，让子弹先飞", scores: { fake: 2, ojbk: 2, ohno: 1 } },
    ]
  },
  {
    id: 53,
    text: "你的社交面具厚度？",
    options: [
      { label: "面具？什么面具？我这是真面目", scores: { fuck: 3, imsb: 2, sexy: 1 } },
      { label: "厚到我自己都忘了底下长什么样", scores: { fake: 3, drunk: 2, joker: 1 } },
      { label: "看场合随时切换，我有个面具库", scores: { think: 3, ctrl: 2, ojbk: 1 } },
      { label: "没多厚，但别人都以为我过得很开心", scores: { lover: 3, ohno: 2, imfw: 1 } },
    ]
  },
  {
    id: 54,
    text: "你做决定靠什么？",
    options: [
      { label: "直觉！感觉对了就干，想多了反而怂", scores: { gogo: 3, imsb: 2, lover: 1 } },
      { label: "数据！表格！对比图！不分析不能活", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "先问一圈朋友再说", scores: { atmer: 2, mum: 2, ohno: 1 } },
      { label: "不做决定，让命运替我选", scores: { ojbk: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 55,
    text: "你出门穿衣服的哲学？",
    options: [
      { label: "必须精心搭配！下楼丢垃圾都要有造型", scores: { sexy: 3, ctrl: 2, boss: 1 } },
      { label: "舒服就行，卫衣运动裤是本体", scores: { malo: 3, zzzz: 2, dead: 1 } },
      { label: "看今天心情走什么路线，可能是潮人可能是流浪汉", scores: { woc: 2, hhhh: 2, lover: 1 } },
      { label: "闻一闻哪个没味穿哪个", scores: { fake: 2, ojbk: 2, monk: 1 } },
    ]
  },
  {
    id: 56,
    text: "你收到一条「在吗？」，你的反应？",
    options: [
      { label: "回：说，什么事？别磨叽", scores: { ctrl: 3, gogo: 2, boss: 1 } },
      { label: "已读不回，在也不在", scores: { solo: 3, dead: 2, fake: 1 } },
      { label: "回个在啊，然后紧张地等对方说", scores: { atmer: 2, thank: 2, ohno: 1 } },
      { label: "开始脑补：完了是不是要借钱", scores: { ohno: 3, think: 2, poor: 1 } },
    ]
  },
  {
    id: 57,
    text: "最能代表你的一句话？",
    options: [
      { label: "来都来了！不做白不做", scores: { gogo: 3, diors: 2, imsb: 1 } },
      { label: "算了", scores: { ojbk: 3, dead: 2, monk: 1 } },
      { label: "凭什么？", scores: { fuck: 3, shit: 2, diors: 1 } },
      { label: "没关系~", scores: { thank: 3, atmer: 2, imfw: 1 } },
    ]
  },
  {
    id: 58,
    text: "你更擅长记住什么？",
    options: [
      { label: "谁对我好过，记得一清二楚", scores: { thank: 3, lover: 2, mum: 1 } },
      { label: "谁得罪过我，这辈子忘不了", scores: { shit: 3, joker: 2, fuck: 1 } },
      { label: "各种没用的冷知识和八卦", scores: { think: 3, malo: 2, woc: 1 } },
      { label: "记性？什么记性？", scores: { zzzz: 3, dead: 2, imsb: 1 } },
    ]
  },
  {
    id: 59,
    text: "团队项目里你什么时候最活跃？",
    options: [
      { label: "分工的时候——方向我来定", scores: { boss: 3, ctrl: 2, fuck: 1 } },
      { label: "干活的时候——给我活干就行", scores: { mum: 3, gogo: 2, atmer: 1 } },
      { label: "出事的时候——别慌让我来救场", scores: { think: 3, ctrl: 2, diors: 1 } },
      { label: "全程潜水，快结束了冒个泡", scores: { zzzz: 3, dead: 2, solo: 1 } },
    ]
  },
  {
    id: 60,
    text: "被夸了你什么反应？",
    options: [
      { label: "内心飘了但表面：嗯还行吧", scores: { ctrl: 3, sexy: 2, fake: 1 } },
      { label: "开心到原地转圈圈！", scores: { hhhh: 3, lover: 2, imsb: 1 } },
      { label: "不自在，觉得配不上这夸", scores: { imfw: 3, ohno: 2, solo: 1 } },
      { label: "互夸！你也很棒！这才是社交精髓", scores: { joker: 2, mum: 2, atmer: 1 } },
    ]
  },
  {
    id: 61,
    text: "吵架之后谁先道歉？",
    options: [
      { label: "谁错谁先，很公平", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "我先吧...冷战比道歉难受一万倍", scores: { atmer: 3, thank: 2, mum: 1 } },
      { label: "我？道歉？你确定没搞错？", scores: { fuck: 3, boss: 2, sexy: 1 } },
      { label: "谁先道歉无所谓，反正我吵完就忘了", scores: { ojbk: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 62,
    text: "你最近的状态是？",
    options: [
      { label: "人间清醒", scores: { ctrl: 2, monk: 2, think: 1 } },
      { label: "人间迷路", scores: { ohno: 3, imfw: 2, solo: 1 } },
      { label: "人间蒸发了", scores: { dead: 3, zzzz: 2, solo: 1 } },
      { label: "人间值得", scores: { hhhh: 3, thank: 2, lover: 1 } },
    ]
  },
  {
    id: 63,
    text: "你做错事了，第一反应？",
    options: [
      { label: "认了，赶紧改", scores: { ctrl: 3, thank: 2, boss: 1 } },
      { label: "先找个借口缓冲一下气氛", scores: { fake: 3, joker: 2, ohno: 1 } },
      { label: "内心愧疚到爆炸但嘴上说不出对不起", scores: { imfw: 3, lover: 2, solo: 1 } },
      { label: "死鸭子嘴硬，我没做错", scores: { fuck: 3, diors: 2, sexy: 1 } },
    ]
  },
  {
    id: 64,
    text: "你最怕哪种社死现场？",
    options: [
      { label: "自我介绍被所有人盯着看", scores: { solo: 3, imfw: 2, ohno: 1 } },
      { label: "全场冷场所有人不说话", scores: { mum: 3, hhhh: 2, atmer: 1 } },
      { label: "被当众点名回答问题", scores: { fake: 3, imfw: 2, dead: 1 } },
      { label: "我不怕社死，社死的是别人", scores: { sexy: 3, fuck: 2, boss: 1 } },
    ]
  },
  {
    id: 65,
    text: "你喜欢什么样的领导？",
    options: [
      { label: "强势型，告诉我做什么别让我自己想", scores: { ojbk: 3, fake: 2, mum: 1 } },
      { label: "放手型，别管我让我自己飞", scores: { gogo: 3, solo: 2, ctrl: 1 } },
      { label: "导师型，带我升级打怪", scores: { think: 3, poor: 2, diors: 1 } },
      { label: "什么型都行，不加班的型最好", scores: { malo: 3, dead: 2, zzzz: 1 } },
    ]
  },
  {
    id: 66,
    text: "旅行时你是什么角色？",
    options: [
      { label: "攻略狂魔，精确到几点去哪个厕所", scores: { ctrl: 3, poor: 2, think: 1 } },
      { label: "走到哪算哪，迷路也是一种风景", scores: { gogo: 3, ojbk: 2, malo: 1 } },
      { label: "跟着走就行，你安排我配合", scores: { atmer: 2, ojbk: 2, fake: 1 } },
      { label: "出发了才想起来查天气那种", scores: { ohno: 3, imsb: 2, zzzz: 1 } },
    ]
  },
  {
    id: 67,
    text: "遇到不公平的事你？",
    options: [
      { label: "当场就指出来！不服！", scores: { fuck: 3, boss: 2, ctrl: 1 } },
      { label: "回去越想越气，半夜还在复盘", scores: { shit: 3, ohno: 2, joker: 1 } },
      { label: "算了，世界本来就不公平", scores: { monk: 3, dead: 2, ojbk: 1 } },
      { label: "想办法用规则反击，打蛇打七寸", scores: { think: 3, ctrl: 2, poor: 1 } },
    ]
  },
  {
    id: 68,
    text: "你的恋爱观更接近？",
    options: [
      { label: "爱就要说出来！藏着掖着算什么谈恋爱", scores: { lover: 3, fuck: 2, gogo: 1 } },
      { label: "细水长流，慢慢来比较快", scores: { monk: 3, think: 2, thank: 1 } },
      { label: "先把自己变优秀，对的人自然来", scores: { ctrl: 3, poor: 2, boss: 1 } },
      { label: "恋爱？我只想搞钱", scores: { diors: 3, shit: 2, malo: 1 } },
    ]
  },
  {
    id: 69,
    text: "你睡前最后一件事？",
    options: [
      { label: "刷手机刷到手机砸脸自动关机", scores: { dead: 3, zzzz: 2, malo: 1 } },
      { label: "复盘今天发生的事，包括别人说的每句话", scores: { think: 3, shit: 2, ctrl: 1 } },
      { label: "跟对象/朋友聊到对方先睡着", scores: { lover: 3, atmer: 2, hhhh: 1 } },
      { label: "发呆，想着有的没的直到意识模糊", scores: { solo: 3, drunk: 2, imfw: 1 } },
    ]
  },
  {
    id: 70,
    text: "你的情绪更像什么？",
    options: [
      { label: "过山车！今天上天明天下地", scores: { ohno: 3, woc: 2, drunk: 1 } },
      { label: "死海，波澜不惊，情绪稳定器本器", scores: { monk: 3, ctrl: 2, ojbk: 1 } },
      { label: "活火山，平时没事一旦爆发方圆十里避难", scores: { fuck: 3, shit: 2, joker: 1 } },
      { label: "阴天，持续低电量模式", scores: { dead: 3, imfw: 2, solo: 1 } },
    ]
  },
  {
    id: 71,
    text: "你上次哭是因为？",
    options: [
      { label: "看个电影哭成狗，纸巾用了一整包", scores: { lover: 3, thank: 2, ohno: 1 } },
      { label: "太累了绷不住了，成年人的崩溃就在一瞬间", scores: { imfw: 3, fake: 2, dead: 1 } },
      { label: "被气哭的！凭什么叫我改八遍！", scores: { fuck: 3, ohno: 2, woc: 1 } },
      { label: "我不记得了/我不哭的/我眼泪很贵", scores: { ctrl: 2, monk: 2, dead: 1 } },
    ]
  },
  {
    id: 72,
    text: "压力山大的时候你怎么泄洪？",
    options: [
      { label: "出去跑一圈/健个身，用汗水冲走焦虑", scores: { gogo: 3, sexy: 2, boss: 1 } },
      { label: "吃喝买！消费疗法虽迟但到", scores: { drunk: 3, atmer: 2, diors: 1 } },
      { label: "把自己关起来消化，别来烦我", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "找个人疯狂吐槽，说出来就舒服了", scores: { lover: 3, atmer: 2, hhhh: 1 } },
    ]
  },
  {
    id: 73,
    text: "有人给你发自拍，你？",
    options: [
      { label: "好看好看好看！！！夸就完事了", scores: { atmer: 3, lover: 2, thank: 1 } },
      { label: "客观评价，好看就说好看不好看也说", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "反手发一张自己的，比比谁更帅", scores: { sexy: 3, hhhh: 2, imsb: 1 } },
      { label: "嗯嗯（敷衍.jpg）", scores: { fake: 2, solo: 2, dead: 1 } },
    ]
  },
  {
    id: 74,
    text: "提到前任你的内心OS？",
    options: [
      { label: "祝TA幸福，真心的", scores: { thank: 3, monk: 2, lover: 1 } },
      { label: "TA过得不好我就放心了", scores: { shit: 3, fuck: 2, joker: 1 } },
      { label: "前任？什么前任？没印象了", scores: { ojbk: 3, dead: 2, monk: 1 } },
      { label: "偶尔深夜还会想起...算了", scores: { lover: 3, drunk: 2, solo: 1 } },
    ]
  },
  {
    id: 75,
    text: "你想在哪儿扎根？",
    options: [
      { label: "大城市！机会多，节奏快，适合我卷", scores: { boss: 3, diors: 2, gogo: 1 } },
      { label: "小城市！节奏慢，生活成本低，适合我躺", scores: { monk: 3, ojbk: 2, malo: 1 } },
      { label: "朋友在哪我就在哪", scores: { atmer: 3, lover: 2, thank: 1 } },
      { label: "深山老林，与世隔绝，别来找我", scores: { solo: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 76,
    text: "你觉得「努力」这玩意儿？",
    options: [
      { label: "不努力怎么行！卷起来！", scores: { boss: 3, ctrl: 2, poor: 1 } },
      { label: "方向比努力重要一百倍，别瞎忙", scores: { think: 3, ctrl: 2, diors: 1 } },
      { label: "能不努力就不努力，努力多累啊", scores: { malo: 3, dead: 2, zzzz: 1 } },
      { label: "伪概念，好多人努力了一辈子也没用", scores: { shit: 3, drunk: 2, fake: 1 } },
    ]
  },
  {
    id: 77,
    text: "你的表情包库存什么水平？",
    options: [
      { label: "几百张起步，聊天全靠表情包续命", scores: { joker: 3, hhhh: 2, woc: 1 } },
      { label: "很少，我靠文字表达真情实感", scores: { think: 3, ctrl: 2, monk: 1 } },
      { label: "只存搞笑的，不开心的时候翻一翻", scores: { hhhh: 3, malo: 2, imsb: 1 } },
      { label: "不用表情包，我很正经的（不是）", scores: { solo: 3, fake: 2, dead: 1 } },
    ]
  },
  {
    id: 78,
    text: "你打游戏时的人格？",
    options: [
      { label: "指挥官！都听我的，包赢", scores: { boss: 3, ctrl: 2, fuck: 1 } },
      { label: "冲锋怪！不管了先冲再说", scores: { gogo: 3, sexy: 2, diors: 1 } },
      { label: "佛系玩家，输赢无所谓开心就行", scores: { ojbk: 3, malo: 2, monk: 1 } },
      { label: "不玩游戏，游戏不值得我花时间", scores: { solo: 2, monk: 2, think: 1 } },
    ]
  },
  {
    id: 79,
    text: "你的睡眠质量？",
    options: [
      { label: "秒睡型！倒头就着，地震都不醒", scores: { zzzz: 3, ojbk: 2, hhhh: 1 } },
      { label: "翻来覆去型，脑子里演电影停不下来", scores: { think: 3, ohno: 2, drunk: 1 } },
      { label: "熬夜型，不到凌晨两点合不上眼", scores: { dead: 3, malo: 2, imsb: 1 } },
      { label: "薛定谔型，时好时坏看命", scores: { fake: 2, imfw: 2, lover: 1 } },
    ]
  },
  {
    id: 80,
    text: "你对社交媒体的真实态度？",
    options: [
      { label: "重度上瘾，一天刷8小时不是梦", scores: { woc: 3, malo: 2, dead: 1 } },
      { label: "偶尔看看，不怎么发，朋友圈是别人的", scores: { solo: 3, think: 2, monk: 1 } },
      { label: "精心经营人设，每条都要P图选滤镜", scores: { sexy: 3, fake: 2, ctrl: 1 } },
      { label: "朋友圈半年更一次，还设了三天可见", scores: { dead: 3, monk: 2, solo: 1 } },
    ]
  },
  {
    id: 81,
    text: "超市结账你选哪条队？",
    options: [
      { label: "最短的！效率优先，我的时间很贵", scores: { gogo: 3, ctrl: 2, boss: 1 } },
      { label: "随便排，等就等呗", scores: { ojbk: 3, monk: 2, thank: 1 } },
      { label: "边排边刷手机，等了多久根本不知道", scores: { dead: 3, malo: 2, fake: 1 } },
      { label: "看哪条收银员颜值最高", scores: { sexy: 2, hhhh: 2, joker: 1 } },
    ]
  },
  {
    id: 82,
    text: "遇到一个搞不定的难题？",
    options: [
      { label: "死磕！不信老子搞不定你", scores: { boss: 3, diors: 2, fuck: 1 } },
      { label: "百度/问人/求助外挂", scores: { think: 2, atmer: 2, poor: 1 } },
      { label: "先放着吧，灵感来了再说", scores: { zzzz: 3, ojbk: 2, malo: 1 } },
      { label: "直接放弃，这个不适合我（其实是怂了）", scores: { dead: 3, imfw: 2, ojbk: 1 } },
    ]
  },
  {
    id: 83,
    text: "你对自己的评价更接近？",
    options: [
      { label: "我挺好的我知道，不接受反驳", scores: { ctrl: 3, sexy: 2, boss: 1 } },
      { label: "还行吧不好不坏凑合过", scores: { ojbk: 3, fake: 2, monk: 1 } },
      { label: "别问了，我什么都不好（哭）", scores: { imfw: 3, dead: 2, ohno: 1 } },
      { label: "每天都在重新认识自己，今天又不太一样", scores: { think: 3, lover: 2, solo: 1 } },
    ]
  },
  {
    id: 84,
    text: "「合群」这事儿你怎么看？",
    options: [
      { label: "很重要！人不能活成孤岛", scores: { lover: 3, atmer: 2, mum: 1 } },
      { label: "不重要！做自己才最酷", scores: { fuck: 3, solo: 2, monk: 1 } },
      { label: "看情况，该合群时合群该独处时独处", scores: { ctrl: 3, fake: 2, think: 1 } },
      { label: "合什么群，群都是利益绑定", scores: { shit: 3, dead: 2, joker: 1 } },
    ]
  },
  {
    id: 85,
    text: "你最缺什么？",
    options: [
      { label: "钱！这还用问吗", scores: { poor: 3, diors: 2, shit: 1 } },
      { label: "陪伴，一个人真的有点难熬", scores: { solo: 3, lover: 2, drunk: 1 } },
      { label: "自信，总是觉得自己不够好", scores: { imfw: 3, ohno: 2, fake: 1 } },
      { label: "什么都不缺，我自给自足", scores: { ctrl: 2, monk: 2, sexy: 1 } },
    ]
  },
  {
    id: 86,
    text: "打开你的冰箱里面有什么？",
    options: [
      { label: "满满的像小型超市，安全感爆棚", scores: { mum: 3, ctrl: 2, atmer: 1 } },
      { label: "几瓶水和两罐过期的酱料", scores: { dead: 3, zzzz: 2, malo: 1 } },
      { label: "外卖剩菜和啤酒，成年人的冰箱", scores: { drunk: 3, malo: 2, ohno: 1 } },
      { label: "健康食材，我很注重饮食的", scores: { think: 3, sexy: 2, poor: 1 } },
    ]
  },
  {
    id: 87,
    text: "你上一次发自拍是什么时候？",
    options: [
      { label: "今天/昨天，好看的必须记录", scores: { sexy: 3, hhhh: 2, woc: 1 } },
      { label: "太久以前了，久到我自己都不记得", scores: { solo: 3, monk: 2, dead: 1 } },
      { label: "我从来不发自拍", scores: { dead: 3, solo: 2, fake: 1 } },
      { label: "只发风景照/美食照，脸不重要", scores: { think: 2, monk: 2, gogo: 1 } },
    ]
  },
  {
    id: 88,
    text: "你说话时手在干嘛？",
    options: [
      { label: "比划来比划去，像指挥交响乐", scores: { boss: 3, fuck: 2, gogo: 1 } },
      { label: "插口袋/抱臂，酷就完事", scores: { solo: 3, sexy: 2, ctrl: 1 } },
      { label: "玩手机/摸东西，手不能闲着", scores: { fake: 3, malo: 2, ohno: 1 } },
      { label: "没什么动作，我很安静的", scores: { monk: 3, ojbk: 2, think: 1 } },
    ]
  },
  {
    id: 89,
    text: "「孤独」和「寂寞」的区别？",
    options: [
      { label: "孤独是享受，寂寞是煎熬，差别大了", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "都一样，都是一个人", scores: { dead: 3, ojbk: 2, malo: 1 } },
      { label: "我不知道，我朋友很多不孤独也不寂寞", scores: { hhhh: 3, sexy: 2, gogo: 1 } },
      { label: "两个都是老朋友了，天天见", scores: { lover: 3, drunk: 2, imfw: 1 } },
    ]
  },
  {
    id: 90,
    text: "你喜欢什么天气？",
    options: [
      { label: "大晴天！出门浪！", scores: { gogo: 3, sexy: 2, hhhh: 1 } },
      { label: "下雨天！窝在家里的理由", scores: { solo: 3, drunk: 2, think: 1 } },
      { label: "阴天，不冷不热不出汗", scores: { ojbk: 3, fake: 2, dead: 1 } },
      { label: "暴风雨！刺激！", scores: { woc: 3, fuck: 2, diors: 1 } },
    ]
  },
  {
    id: 91,
    text: "你对「规则」什么态度？",
    options: [
      { label: "规则就是用来遵守的，别搞特殊", scores: { ctrl: 3, poor: 2, thank: 1 } },
      { label: "规则是人定的，不合理就改", scores: { boss: 3, think: 2, fuck: 1 } },
      { label: "看心情，方便我就遵守不方便就当没看见", scores: { malo: 3, ojbk: 2, fake: 1 } },
      { label: "规则？什么规则？我的规则就是没有规则", scores: { dead: 3, imsb: 2, diors: 1 } },
    ]
  },
  {
    id: 92,
    text: "电梯里遇到邻居你？",
    options: [
      { label: "主动打招呼！早上好！吃了吗！", scores: { hhhh: 3, atmer: 2, gogo: 1 } },
      { label: "点头微笑，不多说，社交礼仪到此为止", scores: { fake: 3, ojbk: 2, thank: 1 } },
      { label: "假装看手机，信号不好没看到", scores: { solo: 3, dead: 2, malo: 1 } },
      { label: "内心疯狂祈祷：别跟我说话别跟我说话", scores: { ohno: 3, imfw: 2, solo: 1 } },
    ]
  },
  {
    id: 93,
    text: "你觉得值不值的判断标准？",
    options: [
      { label: "我自己的感觉，值就值不值就不值", scores: { ctrl: 3, think: 2, boss: 1 } },
      { label: "开心就值！千金难买我乐意", scores: { hhhh: 3, imsb: 2, atmer: 1 } },
      { label: "性价比！花最少的钱办最大的事", scores: { poor: 3, think: 2, diors: 1 } },
      { label: "没什么值不值得，活着就行", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 94,
    text: "猫还是狗？",
    options: [
      { label: "猫，高冷独立像我", scores: { solo: 3, monk: 2, sexy: 1 } },
      { label: "狗，忠诚热情像我希望被爱", scores: { lover: 3, hhhh: 2, atmer: 1 } },
      { label: "都喜欢，选择困难症犯了", scores: { ojbk: 3, thank: 2, ohno: 1 } },
      { label: "都别来，嫌麻烦", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 95,
    text: "朋友怎么形容你？",
    options: [
      { label: "靠谱，什么事交代给你放心", scores: { ctrl: 3, mum: 2, poor: 1 } },
      { label: "搞笑，有你在不冷场", scores: { joker: 3, hhhh: 2, woc: 1 } },
      { label: "温柔，善解人意暖宝宝", scores: { lover: 3, thank: 2, atmer: 1 } },
      { label: "神秘，看不透你在想啥", scores: { solo: 3, fake: 2, monk: 1 } },
    ]
  },
  {
    id: 96,
    text: "你最大的问题是什么？",
    options: [
      { label: "太在意别人的看法，活着像在演给别人看", scores: { imfw: 3, fake: 2, ohno: 1 } },
      { label: "太直了，话一出口对方脸就绿了", scores: { fuck: 3, shit: 2, joker: 1 } },
      { label: "太懒了，执行力为负", scores: { zzzz: 3, malo: 2, dead: 1 } },
      { label: "想太多做太少，脑内剧场比现实丰富", scores: { think: 3, ohno: 2, diors: 1 } },
    ]
  },
  {
    id: 97,
    text: "等人时你在干嘛？",
    options: [
      { label: "刷手机，根本停不下来", scores: { dead: 3, malo: 2, woc: 1 } },
      { label: "观察路人，脑补他们的故事", scores: { think: 3, joker: 2, solo: 1 } },
      { label: "焦虑！等不了！怎么还不来！", scores: { ohno: 3, fuck: 2, gogo: 1 } },
      { label: "发呆，进入低功耗待机模式", scores: { monk: 3, zzzz: 2, dead: 1 } },
    ]
  },
  {
    id: 98,
    text: "你对钱的态度？",
    options: [
      { label: "能省则省，一分钱掰成两半花", scores: { poor: 3, think: 2, ctrl: 1 } },
      { label: "花得开心最重要，钱就是用来花的", scores: { atmer: 3, hhhh: 2, drunk: 1 } },
      { label: "钱是赚出来的不是省出来的", scores: { boss: 3, diors: 2, gogo: 1 } },
      { label: "无所谓，够用就行", scores: { monk: 3, ojbk: 2, dead: 1 } },
    ]
  },
  {
    id: 99,
    text: "你对「成功」的定义？",
    options: [
      { label: "有钱有权有地位，世俗意义上的赢", scores: { boss: 3, ctrl: 2, diors: 1 } },
      { label: "内心平静，活得自在", scores: { monk: 3, solo: 2, ojbk: 1 } },
      { label: "被爱，被需要，被人想起时嘴角上扬", scores: { lover: 3, thank: 2, atmer: 1 } },
      { label: "活着就是成功，别的要求太高了", scores: { dead: 3, malo: 2, imsb: 1 } },
    ]
  },
  {
    id: 100,
    text: "饭局上你是谁？",
    options: [
      { label: "点菜+安排一切的大总管", scores: { boss: 3, ctrl: 2, mum: 1 } },
      { label: "气氛组，全程活跃绝不让场子冷", scores: { hhhh: 3, joker: 2, sexy: 1 } },
      { label: "默默吃，偶尔附和一下", scores: { solo: 3, fake: 2, dead: 1 } },
      { label: "买单侠，钱包最大的那个冤种", scores: { atmer: 3, thank: 2, poor: 1 } },
    ]
  },
  {
    id: 101,
    text: "你更怕失去什么？",
    options: [
      { label: "自由！别束缚我", scores: { gogo: 3, fuck: 2, solo: 1 } },
      { label: "安全感，失去就塌了", scores: { imfw: 3, ohno: 2, lover: 1 } },
      { label: "面子，社死比死还难受", scores: { fake: 3, sexy: 2, boss: 1 } },
      { label: "没什么可失去的，已经空了", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 102,
    text: "你的生活哲学？",
    options: [
      { label: "及时行乐！今天不嗨明天后悔", scores: { gogo: 3, hhhh: 2, drunk: 1 } },
      { label: "未雨绸缪！有备无患才安心", scores: { ctrl: 3, poor: 2, think: 1 } },
      { label: "顺其自然！该来的来该走的走", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "得过且过，活着就不错了", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 103,
    text: "你通讯录多少人？",
    options: [
      { label: "几百个，三教九流我都认识", scores: { hhhh: 3, sexy: 2, atmer: 1 } },
      { label: "不到一百，只留真有用的", scores: { solo: 3, ctrl: 2, monk: 1 } },
      { label: "很多但经常联系的没几个", scores: { fake: 3, woc: 2, ohno: 1 } },
      { label: "不记得了，谁还没事翻通讯录啊", scores: { dead: 3, ojbk: 2, zzzz: 1 } },
    ]
  },
  {
    id: 104,
    text: "你对自己的未来什么感觉？",
    options: [
      { label: "信心满满！我就是明天的C位", scores: { boss: 3, ctrl: 2, sexy: 1 } },
      { label: "有点迷茫，但还在走，总比停着强", scores: { ohno: 3, think: 2, diors: 1 } },
      { label: "没什么期待，走着看吧", scores: { dead: 3, ojbk: 2, malo: 1 } },
      { label: "很焦虑，感觉随时要翻车", scores: { imfw: 3, ohno: 2, poor: 1 } },
    ]
  },
  {
    id: 105,
    text: "你更想当什么角色？",
    options: [
      { label: "领导者，我说了算", scores: { boss: 3, ctrl: 2, fuck: 1 } },
      { label: "跟随者，告诉我干啥就行", scores: { ojbk: 3, fake: 2, mum: 1 } },
      { label: "独行者，自己一个人最爽", scores: { solo: 3, monk: 2, gogo: 1 } },
      { label: "混子，摸鱼才是终极奥义", scores: { malo: 3, zzzz: 2, dead: 1 } },
    ]
  },
  {
    id: 106,
    text: "聚会你想提前溜，你怎么走？",
    options: [
      { label: "跟每个人说再见，一个都不能少", scores: { atmer: 3, thank: 2, mum: 1 } },
      { label: "悄悄消失，像从未来过", scores: { solo: 3, dead: 2, fake: 1 } },
      { label: "走之前再搞一波气氛，完美谢幕", scores: { joker: 3, hhhh: 2, sexy: 1 } },
      { label: "走到门口又犹豫，回来再坐了半小时", scores: { ohno: 3, lover: 2, imfw: 1 } },
    ]
  },
  {
    id: 107,
    text: "「中年危机」会来找你吗？",
    options: [
      { label: "我已经在危机里了好吗！", scores: { shit: 3, drunk: 2, dead: 1 } },
      { label: "不会，我有规划，稳如老狗", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "管他呢，到时候再说", scores: { malo: 3, ojbk: 2, zzzz: 1 } },
      { label: "我可能已经中年了...只是不想承认", scores: { fake: 3, poor: 2, zzzz: 1 } },
    ]
  },
  {
    id: 108,
    text: "被误解了你？",
    options: [
      { label: "必须解释清楚！一个字都不能含糊", scores: { ctrl: 3, fuck: 2, lover: 1 } },
      { label: "算了，解释也没用，信不信随你", scores: { monk: 3, solo: 2, dead: 1 } },
      { label: "委屈到爆炸但张不开嘴", scores: { imfw: 3, ohno: 2, lover: 1 } },
      { label: "笑笑算了，无所谓了", scores: { ojbk: 3, fake: 2, joker: 1 } },
    ]
  },
  {
    id: 109,
    text: "你更喜欢哪种沟通风格？",
    options: [
      { label: "直来直去！别绕弯子别猜谜", scores: { fuck: 3, boss: 2, gogo: 1 } },
      { label: "委婉一点，顾及一下别人感受行不行", scores: { mum: 3, thank: 2, lover: 1 } },
      { label: "看人看场合，灵活切换", scores: { ctrl: 3, fake: 2, think: 1 } },
      { label: "能用表情包解决的绝不用文字", scores: { hhhh: 3, joker: 2, malo: 1 } },
    ]
  },
  {
    id: 110,
    text: "你的「社畜指数」？",
    options: [
      { label: "100%！社畜本畜，已完全驯化", scores: { fake: 3, poor: 2, dead: 1 } },
      { label: "0%！反卷先锋，绝不加班", scores: { malo: 3, fuck: 2, dead: 1 } },
      { label: "50%，被迫营业，内心在抵抗", scores: { ohno: 3, diors: 2, imfw: 1 } },
      { label: "不打工，自己当老板（虽然也没赚到钱）", scores: { boss: 3, ctrl: 2, diors: 1 } },
    ]
  },
  {
    id: 111,
    text: "你最怕哪种社死？",
    options: [
      { label: "打招呼对方没看见，手在空中尴尬飘着", scores: { ohno: 3, imfw: 2, fake: 1 } },
      { label: "消息发错了群，而且撤回不了", scores: { ohno: 3, woc: 2, dead: 1 } },
      { label: "当众被点名夸奖，所有人鼓掌看你", scores: { solo: 3, imfw: 2, thank: 1 } },
      { label: "我不社死，社死的是别人", scores: { sexy: 3, fuck: 2, hhhh: 1 } },
    ]
  },
  {
    id: 112,
    text: "你手机屏幕使用时间？",
    options: [
      { label: "10小时+，手机已经是我身体的一个器官", scores: { dead: 3, malo: 2, woc: 1 } },
      { label: "6-8小时，还行吧正常水平", scores: { fake: 3, hhhh: 2, think: 1 } },
      { label: "3-5小时，很克制了", scores: { ctrl: 3, gogo: 2, poor: 1 } },
      { label: "很少看手机，我跟手机是异地恋", scores: { monk: 3, solo: 2, zzzz: 1 } },
    ]
  },
  {
    id: 113,
    text: "你对「躺平」的看法？",
    options: [
      { label: "一种觉醒！拒绝被资本PUA", scores: { malo: 3, shit: 2, think: 1 } },
      { label: "一种逃避，问题不解决还在那", scores: { boss: 3, ctrl: 2, poor: 1 } },
      { label: "一种休息，躺够了再站起来嘛", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "我现在就在躺平（别打扰我）", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 114,
    text: "你的工作桌面长啥样？",
    options: [
      { label: "整整齐齐，强迫症看了都说好", scores: { ctrl: 3, poor: 2, boss: 1 } },
      { label: "乱但我知道东西在哪，别动我桌面！", scores: { think: 3, joker: 2, diors: 1 } },
      { label: "外卖盒和杂物的坟墓", scores: { dead: 3, malo: 2, zzzz: 1 } },
      { label: "极简，只有电脑和水杯，禅意满满", scores: { monk: 3, solo: 2, fake: 1 } },
    ]
  },
  {
    id: 115,
    text: "「社交距离」这事儿？",
    options: [
      { label: "非常重要！别靠太近！我有气泡！", scores: { solo: 3, monk: 2, ctrl: 1 } },
      { label: "看关系远近，熟人靠多近都行", scores: { ojbk: 3, think: 2, fake: 1 } },
      { label: "不重要，我自来熟，别见外", scores: { atmer: 3, hhhh: 2, lover: 1 } },
      { label: "重要但做不到，老是不小心越界", scores: { imfw: 3, ohno: 2, thank: 1 } },
    ]
  },
  {
    id: 116,
    text: "「仪式感」你怎么看？",
    options: [
      { label: "必须有！生活需要仪式感不然跟咸鱼有啥区别", scores: { lover: 3, sexy: 2, thank: 1 } },
      { label: "搞那么复杂干嘛，累不累啊", scores: { malo: 3, ojbk: 2, dead: 1 } },
      { label: "偶尔搞搞，看心情，想浪漫的时候浪漫一下", scores: { hhhh: 2, woc: 2, fake: 1 } },
      { label: "我连自己生日都记不住你说仪式感？", scores: { zzzz: 3, dead: 2, solo: 1 } },
    ]
  },
  {
    id: 117,
    text: "你最擅长什么？",
    options: [
      { label: "开始新的事！起跑第一名", scores: { gogo: 3, boss: 2, diors: 1 } },
      { label: "把事情做完！坚持到终点", scores: { ctrl: 3, poor: 2, mum: 1 } },
      { label: "想点子！脑洞大开创意无限", scores: { think: 3, joker: 2, woc: 1 } },
      { label: "放弃！及时止损也是一种能力", scores: { dead: 3, zzzz: 2, ojbk: 1 } },
    ]
  },
  {
    id: 118,
    text: "你对「小确幸」？",
    options: [
      { label: "很享受，一杯奶茶就能开心一整天", scores: { thank: 3, lover: 2, hhhh: 1 } },
      { label: "不够！我要大确幸！暴富那种！", scores: { boss: 3, diors: 2, fuck: 1 } },
      { label: "无所谓，幸福不幸福都一个样", scores: { dead: 3, monk: 2, ojbk: 1 } },
      { label: "什么是幸福？这个问题太深了", scores: { dead: 3, imfw: 2, zzzz: 1 } },
    ]
  },
  {
    id: 119,
    text: "你喜欢跟什么样的人混？",
    options: [
      { label: "有趣的！能让我笑的人就是好人", scores: { hhhh: 3, joker: 2, woc: 1 } },
      { label: "靠谱的！说到做到，别画饼", scores: { ctrl: 3, poor: 2, think: 1 } },
      { label: "温柔的！让我安心的人", scores: { lover: 3, mum: 2, thank: 1 } },
      { label: "聪明的！能聊到一起去", scores: { think: 3, solo: 2, ctrl: 1 } },
    ]
  },
  {
    id: 120,
    text: "你是什么类型打工人？",
    options: [
      { label: "卷王！升职加薪我全都要", scores: { boss: 3, poor: 2, ctrl: 1 } },
      { label: "摸鱼王！能偷懒就偷懒，老板看不到就行", scores: { malo: 3, zzzz: 2, dead: 1 } },
      { label: "工具人！指哪打哪，没有灵魂但好使", scores: { fake: 3, atmer: 2, mum: 1 } },
      { label: "刺头！不服就干，PUA不了我", scores: { fuck: 3, shit: 2, diors: 1 } },
    ]
  },
  {
    id: 121,
    text: "你记人脸还是记人名？",
    options: [
      { label: "脸！过目不忘，三秒认人", scores: { think: 3, sexy: 2, joker: 1 } },
      { label: "名！每个人的名字我都能叫出来", scores: { mum: 3, atmer: 2, ctrl: 1 } },
      { label: "都记不住，认识的人脸盲名盲", scores: { dead: 3, zzzz: 2, ohno: 1 } },
      { label: "都记得，但我假装不认识，省得打招呼", scores: { fake: 3, solo: 2, ctrl: 1 } },
    ]
  },
  {
    id: 122,
    text: "「内卷」的本质是什么？",
    options: [
      { label: "零和博弈，互相消耗，最后谁都赢不了", scores: { shit: 3, think: 2, ctrl: 1 } },
      { label: "换个赛道不就行了，想不开的人才卷", scores: { gogo: 3, boss: 2, diors: 1 } },
      { label: "与我无关，我不参与卷", scores: { malo: 3, dead: 2, ojbk: 1 } },
      { label: "被迫卷，不卷就被淘汰，谁想卷啊", scores: { fake: 3, imfw: 2, poor: 1 } },
    ]
  },
  {
    id: 123,
    text: "你更容易被什么打动？",
    options: [
      { label: "真诚的关心，别整虚的", scores: { thank: 3, lover: 2, imfw: 1 } },
      { label: "有逻辑的分析，说服我比感动我有效", scores: { think: 3, ctrl: 2, poor: 1 } },
      { label: "好看的包装和话术，我吃这套", scores: { sexy: 2, fake: 2, atmer: 1 } },
      { label: "很难被打动，我的心是石头做的", scores: { monk: 3, dead: 2, ctrl: 1 } },
    ]
  },
  {
    id: 124,
    text: "你的音乐年度报告你会？",
    options: [
      { label: "秒发朋友圈！我的品味必须让全世界知道", scores: { sexy: 3, woc: 2, hhhh: 1 } },
      { label: "自己悄悄看，不想让别人知道我听什么", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "截图发给最亲密的人，分享就是爱", scores: { lover: 3, drunk: 2, thank: 1 } },
      { label: "没看，不关心，音乐听了就完了", scores: { dead: 3, ojbk: 2, zzzz: 1 } },
    ]
  },
  {
    id: 125,
    text: "哪种客套话最让你翻白眼？",
    options: [
      { label: "「改天一起吃饭」——改天是哪天？！", scores: { fuck: 3, shit: 2, joker: 1 } },
      { label: "「你最近变好了」——啥意思我以前不好？", scores: { ohno: 3, imfw: 2, fake: 1 } },
      { label: "「有什么需要帮忙的尽管说」——说了你真帮？", scores: { solo: 3, ctrl: 2, monk: 1 } },
      { label: "我不讨厌客套话，社交润滑剂懂不懂", scores: { fake: 3, mum: 2, atmer: 1 } },
    ]
  },
  {
    id: 126,
    text: "收到礼物你第一反应？",
    options: [
      { label: "当场拆！惊喜！谢谢！我好喜欢！", scores: { hhhh: 3, thank: 2, lover: 1 } },
      { label: "回去再拆，不想当场表演开心", scores: { solo: 3, fake: 2, think: 1 } },
      { label: "先猜是什么再拆，猜谜比礼物有趣", scores: { think: 3, woc: 2, joker: 1 } },
      { label: "不太收得到礼物...这题超纲了", scores: { imfw: 3, dead: 2, solo: 1 } },
    ]
  },
  {
    id: 127,
    text: "一个人在家你放飞到什么程度？",
    options: [
      { label: "疯狂唱歌跳舞，整个家都是我的舞台", scores: { hhhh: 3, imsb: 2, sexy: 1 } },
      { label: "安静待着，享受与世无争的时光", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "睡觉！能睡多久睡多久！", scores: { zzzz: 3, dead: 2, malo: 1 } },
      { label: "开始打扫卫生，忍不住", scores: { ctrl: 3, mum: 2, poor: 1 } },
    ]
  },
  {
    id: 128,
    text: "你觉得什么最重要？",
    options: [
      { label: "自由！灵魂不能被关笼子里", scores: { gogo: 3, solo: 2, fuck: 1 } },
      { label: "安全感！没有安全感我什么都做不了", scores: { imfw: 3, lover: 2, ctrl: 1 } },
      { label: "被认可！让我觉得我行", scores: { sexy: 3, boss: 2, diors: 1 } },
      { label: "都无所谓，活着就行", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 129,
    text: "选择困难症犯了你？",
    options: [
      { label: "直接选第一个！纠结什么！命中注定！", scores: { gogo: 3, fuck: 2, boss: 1 } },
      { label: "列清单做对比打分表", scores: { think: 3, ctrl: 2, poor: 1 } },
      { label: "问朋友帮我选，选错了还能怪他", scores: { atmer: 2, ohno: 2, mum: 1 } },
      { label: "干脆不选了，顺其自然", scores: { ojbk: 3, zzzz: 2, dead: 1 } },
    ]
  },
  {
    id: 130,
    text: "你对加班的态度？",
    options: [
      { label: "有意义的加班可以接受，别加没意义的班", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "绝不加班！准点走人，谁爱加谁加", scores: { malo: 3, fuck: 2, zzzz: 1 } },
      { label: "加就加吧，反正回去也没事干", scores: { dead: 3, fake: 2, ojbk: 1 } },
      { label: "我自愿加班！卷王本王！", scores: { boss: 3, diors: 2, imfw: 1 } },
    ]
  },
  {
    id: 131,
    text: "你觉得自己是什么人？",
    options: [
      { label: "好人，对谁都好，宁愿委屈自己", scores: { thank: 3, atmer: 2, mum: 1 } },
      { label: "狠人，对谁都狠，包括我自己", scores: { fuck: 3, boss: 2, shit: 1 } },
      { label: "奇人，不走寻常路，我自己都不知道下一步", scores: { imsb: 3, joker: 2, woc: 1 } },
      { label: "废人，啥也不想干，只想躺平", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 132,
    text: "你的消费观更像？",
    options: [
      { label: "花未来的钱！先爽再说！", scores: { atmer: 3, gogo: 2, diors: 1 } },
      { label: "只花自己有的钱，一分都不超支", scores: { poor: 3, ctrl: 2, think: 1 } },
      { label: "大部分时间理性偶尔冲动消费然后后悔", scores: { ohno: 3, fake: 2, woc: 1 } },
      { label: "基本不怎么消费，省着呢", scores: { monk: 3, dead: 2, solo: 1 } },
    ]
  },
  {
    id: 133,
    text: "你的理想团队？",
    options: [
      { label: "我说了算，你们执行就行", scores: { boss: 3, ctrl: 2, fuck: 1 } },
      { label: "大家平等协商，谁有道理听谁的", scores: { thank: 3, ojbk: 2, lover: 1 } },
      { label: "各干各的别互相打扰，合作不如独处", scores: { solo: 3, monk: 2, dead: 1 } },
      { label: "有个人带我走，我跟着就行", scores: { imfw: 3, fake: 2, ohno: 1 } },
    ]
  },
  {
    id: 134,
    text: "你微信置顶是谁？",
    options: [
      { label: "对象/喜欢的人，必须第一时间看到", scores: { lover: 3, drunk: 2, sexy: 1 } },
      { label: "工作群...社畜的悲哀", scores: { fake: 3, poor: 2, ctrl: 1 } },
      { label: "文件传输助手，跟自己聊天最安心", scores: { monk: 3, solo: 2, dead: 1 } },
      { label: "自己，我的微信是我的备忘录", scores: { think: 3, solo: 2, ctrl: 1 } },
    ]
  },
  {
    id: 135,
    text: "被批评了你？",
    options: [
      { label: "虚心接受，认真改，知错能改善莫大焉", scores: { thank: 3, ctrl: 2, poor: 1 } },
      { label: "内心不服但表面疯狂点头", scores: { fake: 3, shit: 2, fuck: 1 } },
      { label: "怼回去！你说的就对了？", scores: { fuck: 3, boss: 2, sexy: 1 } },
      { label: "表面没事回去偷偷哭", scores: { imfw: 3, lover: 2, ohno: 1 } },
    ]
  },
  {
    id: 136,
    text: "你的朋友圈发什么最多？",
    options: [
      { label: "自拍和日常，好看的照片不发浪费了", scores: { sexy: 3, hhhh: 2, gogo: 1 } },
      { label: "吐槽段子和梗图，朋友圈是我的相声舞台", scores: { joker: 3, shit: 2, woc: 1 } },
      { label: "基本不发，朋友圈跟我没关系", scores: { solo: 3, dead: 2, monk: 1 } },
      { label: "转发的文章和知识，文化人就是我", scores: { think: 3, ctrl: 2, poor: 1 } },
    ]
  },
  {
    id: 137,
    text: "你在意别人怎么评价你吗？",
    options: [
      { label: "非常在意！被说了会记一辈子", scores: { imfw: 3, ohno: 2, fake: 1 } },
      { label: "有点在意，但不会影响我的行为", scores: { think: 3, lover: 2, thank: 1 } },
      { label: "完全不在意！我只听自己的", scores: { fuck: 3, ctrl: 2, monk: 1 } },
      { label: "不在意，因为根本没人评价我", scores: { dead: 3, solo: 2, ojbk: 1 } },
    ]
  },
  {
    id: 138,
    text: "什么最能治愈你？",
    options: [
      { label: "和好朋友在一起，笑就完了", scores: { hhhh: 3, atmer: 2, lover: 1 } },
      { label: "一个人安安静静待着，别来烦我", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "吃好吃的！没有什么是火锅解决不了的", scores: { malo: 3, drunk: 2, hhhh: 1 } },
      { label: "花钱/购物，刷卡的那一下最爽", scores: { atmer: 3, sexy: 2, diors: 1 } },
    ]
  },
  {
    id: 139,
    text: "你更怕什么场景？",
    options: [
      { label: "在人多的地方发言，腿抖", scores: { imfw: 3, solo: 2, ohno: 1 } },
      { label: "一个人被困密闭空间，缺氧又恐慌", scores: { gogo: 3, lover: 2, atmer: 1 } },
      { label: "和陌生人一对一聊天，话题枯竭", scores: { fake: 3, ohno: 2, solo: 1 } },
      { label: "都不怕！我天不怕地不怕", scores: { sexy: 3, boss: 2, ctrl: 1 } },
    ]
  },
  {
    id: 140,
    text: "你像什么饮料？",
    options: [
      { label: "可乐！刺激爽快冒泡泡！", scores: { gogo: 3, hhhh: 2, woc: 1 } },
      { label: "咖啡！苦但提神，打工人的命根子", scores: { ctrl: 3, poor: 2, think: 1 } },
      { label: "白开水...无色无味但必不可少", scores: { ojbk: 3, dead: 2, fake: 1 } },
      { label: "酒！越喝越上头，越活越通透", scores: { drunk: 3, lover: 2, joker: 1 } },
    ]
  },
  {
    id: 141,
    text: "你对「完美主义」？",
    options: [
      { label: "我就是完美主义！做就做最好！", scores: { ctrl: 3, poor: 2, boss: 1 } },
      { label: "差不多得了，别太较真", scores: { ojbk: 3, malo: 2, hhhh: 1 } },
      { label: "完美主义是焦虑的亲妈", scores: { imfw: 3, think: 2, ohno: 1 } },
      { label: "完美不存在，何必追求", scores: { monk: 3, dead: 2, shit: 1 } },
    ]
  },
  {
    id: 142,
    text: "你坐地铁/公交时在干嘛？",
    options: [
      { label: "刷手机听音乐，进入个人宇宙", scores: { dead: 3, malo: 2, fake: 1 } },
      { label: "观察车上的人，脑补他们的故事", scores: { think: 3, joker: 2, solo: 1 } },
      { label: "补觉！站着都能睡！", scores: { zzzz: 3, dead: 2, ojbk: 1 } },
      { label: "处理工作看文档，一秒都不浪费", scores: { ctrl: 3, poor: 2, boss: 1 } },
    ]
  },
  {
    id: 143,
    text: "「朋友」的定义是什么？",
    options: [
      { label: "能一起吃饭聊天的人就够了", scores: { hhhh: 3, atmer: 2, gogo: 1 } },
      { label: "关键时刻能帮我的人才是真朋友", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "能看穿我的人，一个眼神就懂", scores: { lover: 3, solo: 2, drunk: 1 } },
      { label: "没有真正的朋友，都是利益交换", scores: { dead: 3, solo: 2, imfw: 1 } },
    ]
  },
  {
    id: 144,
    text: "你更愿意把钱砸在？",
    options: [
      { label: "吃！民以食为天，嘴不能亏", scores: { hhhh: 3, malo: 2, atmer: 1 } },
      { label: "穿！形象管理很重要", scores: { sexy: 3, boss: 2, fake: 1 } },
      { label: "学！投资自己最值", scores: { think: 3, ctrl: 2, diors: 1 } },
      { label: "存！安全感来自存款数字", scores: { poor: 3, imfw: 2, ctrl: 1 } },
    ]
  },
  {
    id: 145,
    text: "你对自己身体什么态度？",
    options: [
      { label: "很注重健康，规律作息自律达人", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "知道不健康但改不了，熬夜一时爽一直熬夜一直爽", scores: { fake: 3, ohno: 2, drunk: 1 } },
      { label: "身体是革命的本钱...这话说着听着，改天再说", scores: { malo: 3, zzzz: 2, dead: 1 } },
      { label: "不在乎，活一天算一天", scores: { dead: 3, imsb: 2, ojbk: 1 } },
    ]
  },
  {
    id: 146,
    text: "你更擅长输出还是倾听？",
    options: [
      { label: "输出！我有很多想法不吐不快", scores: { boss: 3, fuck: 2, sexy: 1 } },
      { label: "倾听！我更愿意听别人说", scores: { thank: 3, mum: 2, solo: 1 } },
      { label: "看情况，两边都能切换", scores: { ctrl: 3, fake: 2, think: 1 } },
      { label: "都不擅长，社恐+话废", scores: { imfw: 3, dead: 2, zzzz: 1 } },
    ]
  },
  {
    id: 147,
    text: "你的电量什么时候最低？",
    options: [
      { label: "社交之后，急需充电回血", scores: { solo: 3, fake: 2, monk: 1 } },
      { label: "工作结束，被掏空了", scores: { dead: 3, poor: 2, zzzz: 1 } },
      { label: "深夜，emo模式耗电最快", scores: { drunk: 3, lover: 2, ohno: 1 } },
      { label: "全天低电量，出厂就是省电模式", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 148,
    text: "你更相信什么？",
    options: [
      { label: "自己！只有自己不会背叛自己", scores: { ctrl: 3, solo: 2, fuck: 1 } },
      { label: "缘分！该来的总会来", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "努力！付出总会有回报", scores: { boss: 3, poor: 2, diors: 1 } },
      { label: "什么都不信，信了就输", scores: { dead: 3, shit: 2, drunk: 1 } },
    ]
  },
  {
    id: 149,
    text: "哪种关系最让你安心？",
    options: [
      { label: "家人，血脉相连跑不掉", scores: { thank: 3, mum: 2, atmer: 1 } },
      { label: "恋人，被一个人全心全意对待", scores: { lover: 3, drunk: 2, sexy: 1 } },
      { label: "朋友，兄弟/闺蜜一辈子", scores: { hhhh: 3, joker: 2, gogo: 1 } },
      { label: "只有自己，靠山山倒靠自己最好", scores: { solo: 3, monk: 2, dead: 1 } },
    ]
  },
  {
    id: 150,
    text: "你怎么解压？",
    options: [
      { label: "运动出汗！跑步举铁把压力撸走", scores: { gogo: 3, boss: 2, sexy: 1 } },
      { label: "购物消费！买买买最解压", scores: { atmer: 3, sexy: 2, diors: 1 } },
      { label: "独处发呆！让我静静", scores: { solo: 3, monk: 2, dead: 1 } },
      { label: "找朋友疯狂吐槽！说出来就舒服了", scores: { lover: 3, fuck: 2, hhhh: 1 } },
    ]
  },
  {
    id: 151,
    text: "「被拒绝」和「被忽视」你更怕哪个？",
    options: [
      { label: "被拒绝！面子上过不去啊", scores: { fake: 3, ohno: 2, sexy: 1 } },
      { label: "被忽视！存在感为零比死还难受", scores: { joker: 3, imfw: 2, lover: 1 } },
      { label: "都不怕！脸皮够厚心够硬", scores: { ctrl: 3, fuck: 2, monk: 1 } },
      { label: "都怕！我脆弱得很", scores: { imfw: 3, ohno: 2, dead: 1 } },
    ]
  },
  {
    id: 152,
    text: "「年龄焦虑」你有吗？",
    options: [
      { label: "有！时间不够用，什么都没做成", scores: { diors: 3, poor: 2, boss: 1 } },
      { label: "没有！年龄只是数字，该怎样怎样", scores: { monk: 3, ojbk: 2, gogo: 1 } },
      { label: "有，但主要是经济焦虑，年龄只是附属品", scores: { poor: 3, shit: 2, fake: 1 } },
      { label: "我都忘了自己多大了，什么年龄？", scores: { dead: 3, zzzz: 2, imsb: 1 } },
    ]
  },
  {
    id: 153,
    text: "你假期怎么安排？",
    options: [
      { label: "提前规划好每一天，行程精确到小时", scores: { ctrl: 3, poor: 2, gogo: 1 } },
      { label: "走一步看一步，迷路也是旅行", scores: { ojbk: 3, malo: 2, hhhh: 1 } },
      { label: "宅在家！没有计划就是最好的计划", scores: { dead: 3, zzzz: 2, solo: 1 } },
      { label: "跟朋友走，他们去哪我去哪", scores: { atmer: 2, fake: 2, thank: 1 } },
    ]
  },
  {
    id: 154,
    text: "你的安全感来自？",
    options: [
      { label: "钱！余额就是安全感", scores: { poor: 3, diors: 2, ctrl: 1 } },
      { label: "亲密关系，有人等我回家", scores: { lover: 3, mum: 2, thank: 1 } },
      { label: "自身能力，别人拿不走的东西最可靠", scores: { boss: 3, ctrl: 2, think: 1 } },
      { label: "不需要安全感，佛系到底", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 155,
    text: "你在团队里通常扮演什么？",
    options: [
      { label: "出点子的人，脑洞担当", scores: { think: 3, joker: 2, diors: 1 } },
      { label: "收拾烂摊子的人，擦屁股专业户", scores: { mum: 3, atmer: 2, poor: 1 } },
      { label: "拆台的人，专治各种不服", scores: { fuck: 3, malo: 2, shit: 1 } },
      { label: "隐形人，在场等于不在场", scores: { solo: 3, dead: 2, fake: 1 } },
    ]
  },
  {
    id: 156,
    text: "你对「承诺」什么态度？",
    options: [
      { label: "说到做到！一口唾沫一个钉", scores: { ctrl: 3, poor: 2, boss: 1 } },
      { label: "看情况，能办到才承诺，别画饼", scores: { think: 3, ojbk: 2, thank: 1 } },
      { label: "承诺只是承诺，别太当真", scores: { malo: 3, fake: 2, joker: 1 } },
      { label: "从不轻易承诺，说了就要负责", scores: { monk: 3, solo: 2, fuck: 1 } },
    ]
  },
  {
    id: 157,
    text: "「运气」在你生活里占多大比重？",
    options: [
      { label: "很重要！我的人生就是靠运气撑着的", scores: { ohno: 3, imsb: 2, diors: 1 } },
      { label: "不存在！一切都是自己争取的", scores: { boss: 3, ctrl: 2, poor: 1 } },
      { label: "有影响但不是决定性的", scores: { think: 3, ojbk: 2, thank: 1 } },
      { label: "我的运气一直不好，习惯了", scores: { imfw: 3, shit: 2, dead: 1 } },
    ]
  },
  {
    id: 158,
    text: "你最常感到什么情绪？",
    options: [
      { label: "快乐！天生乐观派", scores: { hhhh: 3, sexy: 2, gogo: 1 } },
      { label: "焦虑！什么都想什么都担心", scores: { ohno: 3, imfw: 2, think: 1 } },
      { label: "平静！心如止水", scores: { monk: 3, ctrl: 2, ojbk: 1 } },
      { label: "空虚...总觉得缺了点什么", scores: { dead: 3, solo: 2, drunk: 1 } },
    ]
  },
  {
    id: 159,
    text: "你聊天是什么风格？",
    options: [
      { label: "秒回型！看到就回，不回浑身难受", scores: { atmer: 3, hhhh: 2, lover: 1 } },
      { label: "轮回型！想起来才回，可能是明天", scores: { dead: 3, solo: 2, zzzz: 1 } },
      { label: "选择性回复，重要的秒回其他当没看到", scores: { ctrl: 3, fake: 2, think: 1 } },
      { label: "长篇大论型！一发不可收拾，消息比论文长", scores: { lover: 3, joker: 2, drunk: 1 } },
    ]
  },
  {
    id: 160,
    text: "哪句话最能代表你？",
    options: [
      { label: "宁可错杀一千不可放过一个！", scores: { boss: 3, fuck: 2, ctrl: 1 } },
      { label: "随遇而安，强求不来", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "来都来了！试试再说", scores: { gogo: 3, diors: 2, imsb: 1 } },
      { label: "关我什么事", scores: { malo: 3, dead: 2, solo: 1 } },
    ]
  },
  {
    id: 161,
    text: "「幸福」离你多远？",
    options: [
      { label: "就在身边！我现在就很幸福", scores: { hhhh: 3, thank: 2, sexy: 1 } },
      { label: "不远，再努力一下就到了", scores: { diors: 3, poor: 2, boss: 1 } },
      { label: "很远...遥不可及的感觉", scores: { dead: 3, imfw: 2, drunk: 1 } },
      { label: "什么是幸福？你先定义一下", scores: { monk: 3, solo: 2, ojbk: 1 } },
    ]
  },
  {
    id: 162,
    text: "你喜欢什么工作方式？",
    options: [
      { label: "独立完成！别管我让我自己飞", scores: { solo: 3, ctrl: 2, monk: 1 } },
      { label: "团队协作！一起干才带劲", scores: { hhhh: 3, atmer: 2, mum: 1 } },
      { label: "我指挥你们做，分工明确效率高", scores: { boss: 3, fuck: 2, ctrl: 1 } },
      { label: "能不做就不做，这才是终极追求", scores: { malo: 3, dead: 2, zzzz: 1 } },
    ]
  },
  {
    id: 163,
    text: "你对自己的脸什么态度？",
    options: [
      { label: "我觉得自己很好看！自信即巅峰", scores: { sexy: 3, hhhh: 2, ctrl: 1 } },
      { label: "还行吧，不丑也不惊艳，凑合看", scores: { ojbk: 3, fake: 2, think: 1 } },
      { label: "不太满意，想变好看但懒得动", scores: { imfw: 3, ohno: 2, lover: 1 } },
      { label: "无所谓，脸又不是一切，内在美（可能也没有）", scores: { monk: 3, malo: 2, dead: 1 } },
    ]
  },
  {
    id: 164,
    text: "「面子」重要吗？",
    options: [
      { label: "非常重要！面子就是尊严！", scores: { boss: 3, sexy: 2, fake: 1 } },
      { label: "不太重要，里子比面子实在", scores: { think: 3, ctrl: 2, poor: 1 } },
      { label: "完全不重要！我又不是靠面子活的", scores: { fuck: 3, malo: 2, imsb: 1 } },
      { label: "说不清，有时候死要面子有时候不要脸", scores: { ohno: 3, atmer: 2, lover: 1 } },
    ]
  },
  {
    id: 165,
    text: "你更喜欢怎么学东西？",
    options: [
      { label: "自己研究，文档教程走起，闭门造车我开心", scores: { think: 3, solo: 2, ctrl: 1 } },
      { label: "跟人学！边做边问，有人带进步快", scores: { gogo: 3, atmer: 2, ohno: 1 } },
      { label: "看视频！直观易懂还能二倍速", scores: { malo: 3, woc: 2, hhhh: 1 } },
      { label: "学什么学，不学了！", scores: { dead: 3, zzzz: 2, ojbk: 1 } },
    ]
  },
  {
    id: 166,
    text: "你的「人格面具」是？",
    options: [
      { label: "温柔善良的好人，妈妈的骄傲", scores: { thank: 3, mum: 2, fake: 1 } },
      { label: "无所不能的强者，什么都难不倒我", scores: { boss: 3, ctrl: 2, sexy: 1 } },
      { label: "什么都不在乎的佛系，心无挂碍", scores: { monk: 3, ojbk: 2, dead: 1 } },
      { label: "开朗活泼的开心果，永远在笑", scores: { hhhh: 3, joker: 2, woc: 1 } },
    ]
  },
  {
    id: 167,
    text: "别人对你好你？",
    options: [
      { label: "开心接受并真诚感谢！", scores: { thank: 3, hhhh: 2, atmer: 1 } },
      { label: "不好意思...觉得自己不配...", scores: { imfw: 3, ohno: 2, lover: 1 } },
      { label: "先怀疑一下，你图什么？", scores: { shit: 3, think: 2, ctrl: 1 } },
      { label: "冷淡应对，别靠近我", scores: { solo: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 168,
    text: "你对自己最大的误解是什么？",
    options: [
      { label: "以为我很坚强，其实动不动就想哭", scores: { lover: 3, joker: 2, fake: 1 } },
      { label: "以为我很软弱，其实我比谁都硬", scores: { fuck: 3, ctrl: 2, boss: 1 } },
      { label: "以为我很快乐，其实笑是保护色", scores: { drunk: 3, hhhh: 2, imfw: 1 } },
      { label: "没有误解，我就是这样的人，如假包换", scores: { ctrl: 3, monk: 2, sexy: 1 } },
    ]
  },
  {
    id: 169,
    text: "你更怕「改变」还是「一成不变」？",
    options: [
      { label: "改变！我不想失去现有的", scores: { imfw: 3, lover: 2, ctrl: 1 } },
      { label: "一成不变！太无聊了我要刺激", scores: { gogo: 3, woc: 2, diors: 1 } },
      { label: "都不怕，顺其自然", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "都怕！改也不是不改也不是", scores: { ohno: 3, think: 2, fake: 1 } },
    ]
  },
  {
    id: 170,
    text: "压力之下你？",
    options: [
      { label: "更高效！压力就是我的燃料", scores: { boss: 3, ctrl: 2, poor: 1 } },
      { label: "更焦虑！脑子一片空白效率归零", scores: { ohno: 3, imfw: 2, fake: 1 } },
      { label: "更摆烂！算了毁灭吧不干了", scores: { dead: 3, malo: 2, zzzz: 1 } },
      { label: "没感觉，我已经对压力免疫了", scores: { monk: 3, ojbk: 2, fuck: 1 } },
    ]
  },
  {
    id: 171,
    text: "你喜欢什么节奏的生活？",
    options: [
      { label: "快节奏！忙碌充实才感觉在活着", scores: { boss: 3, gogo: 2, ctrl: 1 } },
      { label: "慢节奏！悠然自得才是人生", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "忽快忽慢看心情，活得像个心电图", scores: { woc: 3, malo: 2, ohno: 1 } },
      { label: "无所谓，生活就是生活，节奏是啥", scores: { dead: 3, solo: 2, zzzz: 1 } },
    ]
  },
  {
    id: 172,
    text: "「成年」意味着什么？",
    options: [
      { label: "自由和独立！终于没人管我了", scores: { gogo: 3, solo: 2, ctrl: 1 } },
      { label: "责任和压力！成年人的世界没有容易二字", scores: { fake: 3, poor: 2, imfw: 1 } },
      { label: "没什么特别的，该怎样还怎样", scores: { ojbk: 3, monk: 2, dead: 1 } },
      { label: "一堆还不完的账单，这题太扎心了", scores: { shit: 3, diors: 2, drunk: 1 } },
    ]
  },
  {
    id: 173,
    text: "你更想「被需要」还是「被喜欢」？",
    options: [
      { label: "被需要！说明我有价值，没我不行", scores: { mum: 3, ctrl: 2, atmer: 1 } },
      { label: "被喜欢！被人爱着最幸福", scores: { lover: 3, sexy: 2, thank: 1 } },
      { label: "都不需要，我只在乎自己爽不爽", scores: { solo: 3, monk: 2, dead: 1 } },
      { label: "都想要！贪心有什么错？", scores: { hhhh: 3, ohno: 2, joker: 1 } },
    ]
  },
  {
    id: 174,
    text: "你最大的优势？",
    options: [
      { label: "执行力！说干就干绝不墨迹", scores: { gogo: 3, boss: 2, ctrl: 1 } },
      { label: "思考力！看得远想得深", scores: { think: 3, ctrl: 2, monk: 1 } },
      { label: "情商！会来事，人见人爱", scores: { sexy: 3, fake: 2, atmer: 1 } },
      { label: "心态！天塌下来当被子盖", scores: { monk: 3, ojbk: 2, dead: 1 } },
    ]
  },
  {
    id: 175,
    text: "你对「失败」？",
    options: [
      { label: "失败了就再来！多大点事", scores: { diors: 3, gogo: 2, boss: 1 } },
      { label: "很痛苦，需要很长时间自我修复", scores: { imfw: 3, lover: 2, ohno: 1 } },
      { label: "分析原因避免下次再犯同样的错", scores: { ctrl: 3, think: 2, poor: 1 } },
      { label: "无所谓，本来也不期待成功", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 176,
    text: "你的社交电池容量？",
    options: [
      { label: "超大！社交永动机，根本不需要充电", scores: { hhhh: 3, sexy: 2, gogo: 1 } },
      { label: "中等，用完需要充一下", scores: { fake: 3, think: 2, ojbk: 1 } },
      { label: "很小，出门十分钟电量告急", scores: { solo: 3, imfw: 2, dead: 1 } },
      { label: "出厂就不带电池，我是社交断电版", scores: { dead: 3, monk: 2, zzzz: 1 } },
    ]
  },
  {
    id: 177,
    text: "你对「未来」最大的感受？",
    options: [
      { label: "期待！未来一定会更好", scores: { boss: 3, hhhh: 2, gogo: 1 } },
      { label: "焦虑！不确定的东西太多了", scores: { ohno: 3, imfw: 2, poor: 1 } },
      { label: "无感！过好当下就行", scores: { monk: 3, ojbk: 2, thank: 1 } },
      { label: "恐惧...不知道会怎样", scores: { dead: 3, drunk: 2, solo: 1 } },
    ]
  },
  {
    id: 178,
    text: "什么最能代表你的人生态度？",
    options: [
      { label: "冲！", scores: { gogo: 3, fuck: 2, diors: 1 } },
      { label: "佛~", scores: { monk: 3, ojbk: 2, zzzz: 1 } },
      { label: "算了", scores: { dead: 3, malo: 2, ojbk: 1 } },
      { label: "爱了", scores: { lover: 3, thank: 2, hhhh: 1 } },
    ]
  },
  {
    id: 179,
    text: "你喜欢跟谁一起旅行？",
    options: [
      { label: "一大群朋友！人越多越嗨", scores: { hhhh: 3, atmer: 2, woc: 1 } },
      { label: "一两个亲密的人，安安静静", scores: { lover: 3, solo: 2, monk: 1 } },
      { label: "自己一个人！最自由想走就走", scores: { solo: 3, gogo: 2, ctrl: 1 } },
      { label: "不想旅行，出门太累了", scores: { dead: 3, zzzz: 2, malo: 1 } },
    ]
  },
  {
    id: 180,
    text: "「长大」是好事吗？",
    options: [
      { label: "是！自由更多了，想干嘛干嘛", scores: { gogo: 3, boss: 2, ctrl: 1 } },
      { label: "不是！快乐变少了，账单变多了", scores: { drunk: 3, lover: 2, imfw: 1 } },
      { label: "无所谓，成长是必然的", scores: { monk: 3, ojbk: 2, think: 1 } },
      { label: "我没觉得我长大了，我还是个宝宝", scores: { imsb: 3, malo: 2, dead: 1 } },
    ]
  },
  {
    id: 181,
    text: "你更喜欢清晨还是深夜？",
    options: [
      { label: "清晨！世界刚醒来的感觉太好了", scores: { gogo: 3, boss: 2, ctrl: 1 } },
      { label: "深夜！安静无人打扰适合灵魂出窍", scores: { solo: 3, drunk: 2, think: 1 } },
      { label: "午后！困了就睡，这才是生活", scores: { zzzz: 3, malo: 2, dead: 1 } },
      { label: "无所谓，反正在哪都差不多", scores: { ojbk: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 182,
    text: "你对「社交礼节」？",
    options: [
      { label: "很重要！教养是第一印象", scores: { mum: 3, ctrl: 2, thank: 1 } },
      { label: "表面功夫太假了！虚伪！", scores: { fuck: 3, shit: 2, joker: 1 } },
      { label: "该有的要有但别过度，适可而止", scores: { think: 3, fake: 2, ojbk: 1 } },
      { label: "我不懂礼节也不在意，爱咋咋地", scores: { dead: 3, malo: 2, imsb: 1 } },
    ]
  },
  {
    id: 183,
    text: "你想拥有什么超能力？",
    options: [
      { label: "读心术！看穿所有人想什么", scores: { ctrl: 3, think: 2, shit: 1 } },
      { label: "隐身术！没人能发现我", scores: { solo: 3, fake: 2, dead: 1 } },
      { label: "瞬移！想去哪就去哪", scores: { gogo: 3, woc: 2, diors: 1 } },
      { label: "时间暂停！让世界停下来我歇会儿", scores: { monk: 3, zzzz: 2, ohno: 1 } },
    ]
  },
  {
    id: 184,
    text: "你的人生BGM是？",
    options: [
      { label: "热血战斗曲！每天都是BOSS战", scores: { boss: 3, gogo: 2, fuck: 1 } },
      { label: "抒情慢歌，内心住着一个诗人", scores: { lover: 3, drunk: 2, solo: 1 } },
      { label: "搞笑配乐，人生如戏全靠演技", scores: { joker: 3, hhhh: 2, imsb: 1 } },
      { label: "白噪音，安静到让人心慌", scores: { dead: 3, monk: 2, zzzz: 1 } },
    ]
  },
  {
    id: 185,
    text: "你更想以什么方式存在？",
    options: [
      { label: "被关注！舞台中央聚光灯打我身上", scores: { sexy: 3, boss: 2, hhhh: 1 } },
      { label: "被需要！幕后功臣，没我不行", scores: { mum: 3, ctrl: 2, thank: 1 } },
      { label: "不被注意！自由自在最舒服", scores: { solo: 3, monk: 2, gogo: 1 } },
      { label: "不存在...", scores: { dead: 3, zzzz: 2, ojbk: 1 } },
    ]
  },
  {
    id: 186,
    text: "你是什么味的冰淇淋？",
    options: [
      { label: "香草，经典百搭不出错", scores: { ojbk: 3, thank: 2, think: 1 } },
      { label: "辣味！刺激出圈让人忘不了", scores: { fuck: 3, woc: 2, diors: 1 } },
      { label: "巧克力，浓郁深沉有内涵", scores: { ctrl: 3, lover: 2, drunk: 1 } },
      { label: "抹茶，清冷淡雅高级感", scores: { monk: 3, solo: 2, sexy: 1 } },
    ]
  },
  {
    id: 187,
    text: "你对「社恐」？",
    options: [
      { label: "我就是社恐本恐，别看我", scores: { solo: 3, imfw: 2, dead: 1 } },
      { label: "社恐？不存在的，我社牛", scores: { sexy: 3, hhhh: 2, gogo: 1 } },
      { label: "看场合，有时候社恐有时候社牛", scores: { fake: 3, ohno: 2, woc: 1 } },
      { label: "不是恐惧，是选择不社交", scores: { monk: 3, dead: 2, malo: 1 } },
    ]
  },
  {
    id: 188,
    text: "什么颜色最能代表你？",
    options: [
      { label: "红色！热情似火走到哪烧到哪", scores: { fuck: 3, gogo: 2, sexy: 1 } },
      { label: "蓝色！冷静理性像一片深海", scores: { think: 3, ctrl: 2, monk: 1 } },
      { label: "灰色...平淡无奇但真实", scores: { dead: 3, fake: 2, ojbk: 1 } },
      { label: "彩虹！五彩缤纷每天不一样", scores: { hhhh: 3, woc: 2, lover: 1 } },
    ]
  },
  {
    id: 189,
    text: "你最讨厌哪种聊天？",
    options: [
      { label: "阴阳怪气型，有话直说不行吗", scores: { fuck: 3, shit: 2, ohno: 1 } },
      { label: "已读不回型，你看了为什么不回！", scores: { lover: 3, ohno: 2, imfw: 1 } },
      { label: "长篇大论说不到重点型，我时间很贵", scores: { ctrl: 3, gogo: 2, boss: 1 } },
      { label: "直接批评不留情面型，说之前先照照镜子", scores: { imfw: 3, fake: 2, thank: 1 } },
    ]
  },
  {
    id: 190,
    text: "你喜欢「惊喜」还是「确定性」？",
    options: [
      { label: "惊喜！生活需要刺激不然跟咸鱼有啥区别", scores: { woc: 3, hhhh: 2, gogo: 1 } },
      { label: "确定性！不想有意外，意外都不是好意外", scores: { ctrl: 3, poor: 2, imfw: 1 } },
      { label: "都可以，看情况", scores: { ojbk: 3, fake: 2, think: 1 } },
      { label: "都别来，我只想静静", scores: { dead: 3, solo: 2, monk: 1 } },
    ]
  },
  {
    id: 191,
    text: "「善良」是优点还是弱点？",
    options: [
      { label: "优点！善良是力量", scores: { thank: 3, lover: 2, mum: 1 } },
      { label: "弱点！善良容易被欺负", scores: { shit: 3, imfw: 2, fuck: 1 } },
      { label: "看对谁，别对不值得的人善良", scores: { ctrl: 3, think: 2, diors: 1 } },
      { label: "无所谓，善良不善良都一样活着", scores: { dead: 3, monk: 2, ojbk: 1 } },
    ]
  },
  {
    id: 192,
    text: "你朋友圈发什么最多？",
    options: [
      { label: "美食/风景/日常记录", scores: { hhhh: 3, gogo: 2, thank: 1 } },
      { label: "吐槽/段子和梗图，朋友圈是我的舞台", scores: { joker: 3, shit: 2, woc: 1 } },
      { label: "知识分享/行业观点，我是文化人", scores: { think: 3, ctrl: 2, poor: 1 } },
      { label: "从来不发，朋友圈是什么", scores: { solo: 3, dead: 2, monk: 1 } },
    ]
  },
  {
    id: 193,
    text: "你的灵魂年龄是？",
    options: [
      { label: "5岁！永远长不大，快乐最重要", scores: { imsb: 3, hhhh: 2, ohno: 1 } },
      { label: "80岁！看透一切心如止水", scores: { monk: 3, dead: 2, shit: 1 } },
      { label: "就是实际年龄，我很正常", scores: { ctrl: 3, ojbk: 2, fake: 1 } },
      { label: "不确定，每天不一样，薛定谔的灵魂年龄", scores: { woc: 3, lover: 2, drunk: 1 } },
    ]
  },
  {
    id: 194,
    text: "你更怕「犯错」还是「错过」？",
    options: [
      { label: "犯错！丢人！社死！", scores: { imfw: 3, fake: 2, ohno: 1 } },
      { label: "错过！后悔一辈子！", scores: { gogo: 3, lover: 2, diors: 1 } },
      { label: "都不怕，该犯的犯该错过的错过", scores: { monk: 3, fuck: 2, ojbk: 1 } },
      { label: "都怕！这题好难选", scores: { think: 3, ohno: 2, poor: 1 } },
    ]
  },
  {
    id: 195,
    text: "你的精神状态更像？",
    options: [
      { label: "稳定如山，雷打不动", scores: { ctrl: 3, monk: 2, boss: 1 } },
      { label: "过山车！今天天堂明天地狱", scores: { ohno: 3, woc: 2, drunk: 1 } },
      { label: "一潭死水，波澜不惊因为已经没气了", scores: { dead: 3, zzzz: 2, ojbk: 1 } },
      { label: "五彩斑斓的黑，混乱中自有秩序", scores: { imsb: 3, joker: 2, malo: 1 } },
    ]
  },
  {
    id: 196,
    text: "你对「加班费」？",
    options: [
      { label: "给钱就加！有钱能使鬼推磨", scores: { poor: 3, diors: 2, ctrl: 1 } },
      { label: "给钱也不想加！我的时间无价", scores: { malo: 3, gogo: 2, solo: 1 } },
      { label: "不给钱也加，为了升职忍了", scores: { boss: 3, fake: 2, imfw: 1 } },
      { label: "加班费？加了班也看不到钱的", scores: { shit: 3, dead: 2, drunk: 1 } },
    ]
  },
  {
    id: 197,
    text: "「孤独」对你来说是什么体验？",
    options: [
      { label: "享受！独处是最好的充电方式", scores: { solo: 3, monk: 2, think: 1 } },
      { label: "痛苦！我不想一个人", scores: { lover: 3, imfw: 2, ohno: 1 } },
      { label: "习惯了，没什么感觉", scores: { dead: 3, fake: 2, ojbk: 1 } },
      { label: "偶尔孤独，大部分时间还好", scores: { hhhh: 3, thank: 2, atmer: 1 } },
    ]
  },
  {
    id: 198,
    text: "你想活在哪部影视作品里？",
    options: [
      { label: "热血漫！战斗冒险燃烧青春", scores: { gogo: 3, boss: 2, diors: 1 } },
      { label: "治愈系！温暖日常岁月静好", scores: { thank: 3, lover: 2, mum: 1 } },
      { label: "悬疑推理！烧脑刺激智商在线", scores: { think: 3, ctrl: 2, shit: 1 } },
      { label: "末日废土！活着就是终极目标", scores: { dead: 3, malo: 2, monk: 1 } },
    ]
  },
  {
    id: 199,
    text: "你最不擅长什么？",
    options: [
      { label: "拒绝别人，我说不出那个不字", scores: { atmer: 3, imfw: 2, thank: 1 } },
      { label: "表达感情，爱你在心口难开", scores: { solo: 3, fake: 2, dead: 1 } },
      { label: "妥协退让，我绝不低头", scores: { fuck: 3, boss: 2, sexy: 1 } },
      { label: "坚持做一件事，三分钟热度本人", scores: { zzzz: 3, ohno: 2, malo: 1 } },
    ]
  },
  {
    id: 200,
    text: "你对「退休」的想象？",
    options: [
      { label: "环游世界！把年轻时没去的地方全去了", scores: { gogo: 3, sexy: 2, hhhh: 1 } },
      { label: "种花养猫！安静度日与世无争", scores: { monk: 3, solo: 2, thank: 1 } },
      { label: "继续赚钱！闲不下来也不想闲", scores: { boss: 3, poor: 2, ctrl: 1 } },
      { label: "能活到退休吗？先活过这周再说", scores: { dead: 3, shit: 2, drunk: 1 } },
    ]
  },
  {
    id: 201,
    text: "你的「人设」是什么？",
    options: [
      { label: "靠谱担当，交给我放心", scores: { ctrl: 3, poor: 2, mum: 1 } },
      { label: "搞笑担当，有我在不冷场", scores: { joker: 3, hhhh: 2, imsb: 1 } },
      { label: "颜值担当，好看就完了", scores: { sexy: 3, boss: 2, lover: 1 } },
      { label: "没有担当，我是废物人设", scores: { dead: 3, zzzz: 2, ojbk: 1 } },
    ]
  },
  {
    id: 202,
    text: "最后确认一下，你的精神状态？",
    options: [
      { label: "非常好！人生巅峰状态在线", scores: { boss: 3, sexy: 2, hhhh: 1 } },
      { label: "一般般，凑合过吧", scores: { ojbk: 3, fake: 2, monk: 1 } },
      { label: "不太行但还在撑，硬撑", scores: { imfw: 3, ohno: 2, drunk: 1 } },
      { label: "已离世，现在是AI在替我答题", scores: { dead: 3, malo: 2, imsb: 1 } },
    ]
  },
];
