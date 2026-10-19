/**
 * data.js — ALL numbers, tables and case texts shown on the ReState project page.
 * ---------------------------------------------------------------------------
 * Source of truth: LaTeX source  iclr2027_conference.tex  (+ figures/*.pdf).
 * Each constant lists the table / figure it comes from, so you can re-check it
 * whenever the paper changes.
 *
 *   PAPER         Tab.1 / Tab.2 / Tab.3   main results, row by row
 *   BREAKDOWN     Tab.4        break-down ablation on VersaCoT-10K
 *   ITER          Fig.4 (figures/figs-05.pdf) rounds 0-9
 *   DOMAINS       App. B       8 domains, source benchmarks, 1,250 each
 *   CASES         Fig.14/15/16 iterative reasoning-state refinement examples
 *   COMPARE       Fig.8-13     qualitative comparison with baselines
 *
 * Markup allowed inside CASES[].rounds[].cot strings:
 *   <e>...</e>  erroneous reasoning            -> red
 *   <f>...</f>  corrected / preserved evidence -> green
 *   <w>...</w>  reasoning-answer inconsistency -> amber
 *
 * HOW TO EDIT: change values here only; main.js re-renders every chart / table.
 * Arrays indexed by backbone always follow the BACKBONES order.
 */

const BACKBONES = ['Qwen2.5-VL-7B', 'Qwen3-VL-8B', 'Qwen3.5-9B'];
/* [backbone][round 0..9] */
const ITER = {
  versacot: [
    [75.10, 76.20, 76.70, 76.90, 77.05, 76.90, 77.00, 76.85, 77.00, 76.85],
    [77.25, 78.50, 78.90, 79.10, 79.00, 79.15, 79.25, 78.80, 78.85, 79.00],
    [78.45, 81.10, 81.50, 81.80, 81.65, 81.90, 81.70, 81.85, 81.60, 81.85],
  ],
  scienceqa: [
    [97.34, 97.38, 97.38, 97.41, 97.43, 97.43, 97.43, 97.43, 97.43, 97.41],
    [98.00, 98.07, 98.09, 98.09, 98.14, 98.14, 98.14, 98.14, 98.14, 98.16],
    [97.83, 98.37, 98.35, 98.37, 98.35, 98.37, 98.35, 98.37, 98.35, 98.37],
  ],
  m3cot: [
    [81.28, 84.17, 84.64, 84.34, 84.77, 84.25, 84.99, 84.38, 84.86, 84.34],
    [83.05, 86.67, 87.23, 87.58, 87.88, 87.62, 87.88, 87.66, 87.92, 87.96],
    [86.84, 88.83, 88.96, 89.00, 88.96, 88.91, 88.96, 88.96, 88.91, 88.96],
  ],
};

/* =====================================================================
   PAPER — the three main result tables, copied row by row from the LaTeX
   source (Tab.1 lines 314-360, Tab.2 392-433, Tab.3 452-497).
   Row format:  [tag, ...lead columns..., ...numeric columns...]
     tag 'g' = group header row (second item is its text)
         'z' = zero-shot / baseline row — hidden until "Show all models"
         ''  = fine-tuned row on a matched backbone
         'o' = our ReState row (highlighted)
   Number suffix:  *  paper marks it red  = best inside that backbone group
                   ^  paper marks it blue = second best inside that group
   (The red/blue comparison is per 4-row backbone group, not across the table.)
   ===================================================================== */
const PAPER = {
  versacot: {
    tab: 'Table 1', label: 'VersaCoT-10K',
    lead: ['Model', 'Learning', 'Size'],
    cols: ['MED', 'DRIVE', 'COMMON', 'DIAG', 'SPAT', 'GEO', 'CHART', 'MULTI'],
    last: 'Avg',
    note: 'MED = medical, DRIVE = driving &amp; safety, COMMON = visual commonsense, DIAG = scientific diagram, SPAT = spatial perception, GEO = geometric &amp; mathematical, CHART = chart computation, MULTI = multidisciplinary knowledge.',
    rows: [
    ['z', 'Random', '-', '-', '22.00','46.80','26.80','26.27','39.87','22.93','22.00','25.60','29.03'],
    ['z', 'Human', '-', '-', '66.00','89.20','90.40','88.00','92.00','94.40','96.00','85.20','87.65'],
    ['g', 'Open-source Models + Zero-shot'],
    ['z', 'Qwen2.5-VL-7B', 'Zero-shot', '7B', '48.00','52.00','88.80','72.40','76.80','70.40','82.40','48.80','67.45'],
    ['z', 'Qwen3-VL-8B', 'Zero-shot', '8B', '51.60','57.20','88.80','79.20','89.20','68.80','83.60','54.00','71.55'],
    ['z', 'Qwen3.5-9B', 'Zero-shot', '9B', '61.60','59.60','87.60','81.20','83.60','70.80','84.80','54.00','72.90'],
    ['z', 'Qwen3.5-122B-A10B', 'Zero-shot', '122B', '66.40','62.80','89.20','90.80','87.60','86.80','93.20','63.20','80.00'],
    ['z', 'Qwen3.6-27B', 'Zero-shot', '27B', '68.80','59.60','90.00','88.40','86.40','87.60','93.60','62.00','79.55'],
    ['z', 'MiniMax-M3', 'Zero-shot', '428B', '60.80','58.00','88.00','80.80','79.20','73.60','92.00','61.60','74.25'],
    ['z', 'GLM-4.6V', 'Zero-shot', '106B', '60.40','59.20','90.00','85.20','87.60','78.40','93.60','60.80','76.90'],
    ['z', 'Kimi-K2.6', 'Zero-shot', '1T', '68.40','63.20','91.60','77.20','85.20','55.20','94.00','58.00','74.10'],
    ['z', 'Kimi-K3', 'Zero-shot', '2.8T', '71.60','70.40','90.00','92.40','90.80','91.60','98.00','80.40','85.65'],
    ['g', 'Close-source Models + Zero-shot'],
    ['z', 'Qwen3.7-Flash', 'Zero-shot', '-', '65.60','62.80','84.00','86.80','84.80','74.40','90.00','60.00','76.05'],
    ['z', 'Qwen3.8-Max', 'Zero-shot', '-', '74.00','70.00','92.40','91.60','92.00','94.80','96.80','71.20','85.35'],
    ['z', 'Grok-4.6', 'Zero-shot', '-', '74.00','71.60','88.00','92.80','87.20','95.20','98.00','88.00','86.85'],
    ['z', 'GLM-5V-Turbo', 'Zero-shot', '-', '66.00','63.60','89.20','86.00','91.20','64.00','94.80','59.60','76.80'],
    ['z', 'GPT-5.6-Terra', 'Zero-shot', '-', '66.00','62.40','88.80','86.80','84.80','73.60','95.20','67.60','78.15'],
    ['z', 'GPT-5.6-Sol', 'Zero-shot', '-', '70.80','69.20','90.00','92.00','82.80','87.60','97.20','74.40','83.00'],
    ['z', 'Claude Sonnet 5', 'Zero-shot', '-', '68.80','63.60','89.20','86.80','82.00','78.80','94.80','69.20','79.15'],
    ['z', 'Claude Opus 5', 'Zero-shot', '-', '70.80','75.20','89.20','90.80','85.60','89.60','98.40','78.00','84.70'],
    ['z', 'Seed-1.8', 'Zero-shot', '-', '64.80','58.80','90.80','88.00','85.60','91.60','94.80','66.40','80.10'],
    ['z', 'Seed-2.1-Pro', 'Zero-shot', '-', '74.40','71.20','89.60','90.40','88.80','96.80','94.80','75.60','85.20'],
    ['g', 'Fine-tuning Methods'],
    ['', 'Qwen2.5-VL-7B', 'Fine-tune', '7B', '61.20*','65.60','90.00*','83.20','88.40^','72.40','91.20','49.20','75.15'],
    ['', 'Qwen2.5-VL-7B + Multimodal-CoT', 'Fine-tune', '7B', '49.20','62.00','83.60','82.40','81.20','73.20','92.40','57.20*','72.65'],
    ['', 'Qwen2.5-VL-7B + MIND', 'Fine-tune', '7B', '55.20','66.00^','88.80^','85.20^','85.60','74.00^','94.80*','56.40^','75.75^'],
    ['o', 'Qwen2.5-VL-7B + ReState (Ours)', 'Fine-tune', '7B', '57.20^','68.00*','88.40','87.60*','89.60*','76.80*','94.00^','54.80','77.05*'],
    ['', 'Qwen3-VL-8B', 'Fine-tune', '8B', '59.20*','60.80','88.40^','87.60^','90.40','76.00','90.80','52.00','75.65'],
    ['', 'Qwen3-VL-8B + Multimodal-CoT', 'Fine-tune', '8B', '50.00','66.00','83.20','82.00','90.80^','83.20^','95.60*','61.20*','76.50'],
    ['', 'Qwen3-VL-8B + MIND', 'Fine-tune', '8B', '54.80','67.60^','90.80*','84.80','90.00','83.60*','94.40^','60.80^','78.35^'],
    ['o', 'Qwen3-VL-8B + ReState (Ours)', 'Fine-tune', '8B', '58.80^','69.20*','87.20','89.60*','91.60*','82.80','94.40^','60.40','79.25*'],
    ['', 'Qwen3.5-9B', 'Fine-tune', '9B', '61.20','70.00^','86.80^','90.00','90.00','74.00','94.40','56.00','77.80'],
    ['', 'Qwen3.5-9B + Multimodal-CoT', 'Fine-tune', '9B', '56.40','63.60','83.60','87.20','88.00','88.80*','94.00','56.80','77.30'],
    ['', 'Qwen3.5-9B + MIND', 'Fine-tune', '9B', '63.20^','68.80','86.40','91.60*','90.80^','84.00^','96.00*','60.80^','80.20^'],
    ['o', 'Qwen3.5-9B + ReState (Ours)', 'Fine-tune', '9B', '66.40*','76.00*','89.20*','91.20^','92.00*','83.60','95.20^','61.60*','81.90*'],
    ],
  },

  scienceqa: {
    tab: 'Table 2', label: 'ScienceQA',
    lead: ['Model', 'Learning', 'Size'],
    cols: ['NAT', 'SOC', 'LAN', 'TXT', 'IMG', 'NO', 'G1-6', 'G7-12'],
    last: 'Avg',
    note: 'NAT = natural science, SOC = social science, LAN = language science, TXT = text context, IMG = image context, NO = no context, G1-6 / G7-12 = school grades.',
    rows: [
    ['z', 'Random', '-', '-', '40.28','46.13','29.25','47.45','40.08','33.66','39.35','40.67','39.83'],
    ['z', 'Human', '-', '-', '90.23','84.97','87.48','89.60','87.50','88.10','91.59','82.42','88.40'],
    ['z', 'ViLT', 'Fine-tune', '113M', '60.48','63.89','60.27','63.20','61.38','57.00','60.72','61.90','61.14'],
    ['z', 'Patch-TRM', 'Fine-tune', '90M', '65.19','46.79','65.55','66.96','55.28','64.95','58.04','67.50','61.42'],
    ['z', 'VisualBERT', 'Fine-tune', '111M', '59.33','69.18','61.18','62.71','62.17','58.54','62.96','59.92','61.87'],
    ['z', 'LLaMA-Adapter', 'Fine-tune', '6B', '84.37','88.30','84.36','83.72','80.32','86.90','85.83','84.05','85.19'],
    ['z', 'LLaVA', 'Fine-tune', '13B', '90.36','95.95','88.00','89.49','88.00','90.66','90.93','90.90','90.92'],
    ['z', 'LaVIN', 'Fine-tune', '7B', '89.25','94.94','85.24','88.51','87.46','88.08','90.16','88.07','89.41'],
    ['z', 'Qwen2.5-VL-7B', 'Zero-shot', '7B', '83.79','88.30','82.45','83.63','84.38','81.81','86.67','80.29','84.39'],
    ['z', 'Qwen3-VL-8B', 'Zero-shot', '8B', '90.54','94.49','87.64','92.18','91.67','86.20','90.64','90.57','90.62'],
    ['z', 'Qwen3.5-9B', 'Zero-shot', '9B', '91.34','94.38','88.55','92.72','92.81','86.69','92.47','89.06','91.25'],
    ['z', 'Qwen3.8-Max', 'Zero-shot', '-', '98.31','99.55','96.55','98.68','98.81','96.38','98.31','97.76','98.11'],
    ['z', 'Grok-4.6', 'Zero-shot', '-', '95.60','95.39','94.64','96.63','94.89','93.80','96.15','93.80','95.31'],
    ['z', 'GPT-5.6-Sol', 'Zero-shot', '-', '98.18','95.95','98.82','97.65','96.58','98.75','98.38','96.97','97.88'],
    ['z', 'Gemini-3.5-Flash', 'Zero-shot', '-', '98.52','98.43','97.64','98.19','98.02','97.98','98.57','97.82','98.30'],
    ['z', 'Claude Sonnet 5', 'Zero-shot', '-', '95.60','95.39','95.45','94.13','93.90','95.89','96.26','94.20','95.52'],
    ['z', 'Claude Opus 5', 'Zero-shot', '-', '98.45','96.85','98.64','97.41','97.22','98.68','98.60','97.36','98.16'],
    ['z', 'Seed-2.1-Pro', 'Zero-shot', '-', '97.11','97.98','96.27','97.41','96.68','96.24','97.10','97.03','97.08'],
    ['z', 'Kimi-K3', 'Zero-shot', '2.8T', '97.96','98.31','99.09','98.00','97.57','98.82','98.46','98.09','98.33'],
    ['z', 'Multimodal-CoT<sub>base</sub>', 'Fine-tune', '223M', '84.06','92.35','82.18','82.75','82.75','84.74','85.79','84.44','85.31'],
    ['z', 'MC-CoT<sub>base</sub>', 'Fine-tune', '223M', '91.87','84.59','93.00','92.28','88.30','92.75','90.64','90.64','90.64'],
    ['z', 'Multimodal-T-SciQ<sub>base</sub>', 'Fine-tune', '223M', '91.52','91.45','92.45','91.94','90.33','92.26','92.11','91.10','91.75'],
    ['z', 'MIND<sub>base</sub>', 'Fine-tune', '223M', '93.07','96.74','87.09','92.42','92.76','89.27','92.91','91.17','92.29'],
    ['g', 'Fine-tuning Methods'],
    ['', 'Qwen2.5-VL-7B', 'Fine-tune', '7B', '97.02','97.86','92.82','96.77','96.33','94.15','96.92','94.66','96.11'],
    ['', 'Qwen2.5-VL-7B + Multimodal-CoT', 'Fine-tune', '7B', '97.47','97.19','90.82','97.46','96.58','92.40','96.04','95.06','95.68'],
    ['', 'Qwen2.5-VL-7B + MIND', 'Fine-tune', '7B', '97.56^','98.20^','93.36^','97.56^','97.03^','94.49^','97.06^','95.78^','96.60^'],
    ['o', 'Qwen2.5-VL-7B + ReState (Ours)', 'Fine-tune', '7B', '97.91*','99.44*','94.82*','98.04*','98.17*','95.54*','97.91*','96.57*','97.43*'],
    ['', 'Qwen3-VL-8B', 'Fine-tune', '8B', '98.13^','97.19','94.09','98.00^','97.12','95.12','96.95','96.77','96.89'],
    ['', 'Qwen3-VL-8B + Multimodal-CoT', 'Fine-tune', '8B', '97.42','97.08','94.27','97.26','96.28','95.33','96.92','95.85','96.53'],
    ['', 'Qwen3-VL-8B + MIND', 'Fine-tune', '8B', '97.96','98.31^','94.64^','97.90','97.37^','95.61^','97.32^','96.90^','97.17^'],
    ['o', 'Qwen3-VL-8B + ReState (Ours)', 'Fine-tune', '8B', '99.07*','99.10*','95.55*','99.17*','98.81*','96.38*','98.27*','97.96*','98.16*'],
    ['', 'Qwen3.5-9B', 'Fine-tune', '9B', '95.69','96.40','94.73','95.31','94.15','95.68^','95.89','95.06','95.59'],
    ['', 'Qwen3.5-9B + Multimodal-CoT', 'Fine-tune', '9B', '96.40^','96.63','92.73','96.29^','95.49^','94.01','95.78','94.99','95.50'],
    ['', 'Qwen3.5-9B + MIND', 'Fine-tune', '9B', '95.78','97.64^','97.18^','95.45','94.60','97.63*','97.10^','95.52^','96.53^'],
    ['o', 'Qwen3.5-9B + ReState (Ours)', 'Fine-tune', '9B', '98.71*','98.76*','97.36*','98.78*','98.46*','97.63*','98.60*','97.96*','98.37*'],
    ],
  },

  m3cot: {
    tab: 'Table 3', label: 'M<sup>3</sup>CoT',
    lead: ['Model', 'Size'],
    /* two-level header: [group title, [sub columns]] */
    groups: [['Science', ['Lang', 'Natural', 'Social']],
             ['Commonsense', ['Physical', 'Social', 'Temporal']],
             ['Mathematics', ['Algebra', 'Geometry', 'Theory']]],
    last: 'Total',
    note: 'Nine sub-tasks grouped into Science, Commonsense and Mathematics. Random and Human are averaged over three trials.',
    rows: [
    ['z', 'Random', '-', '32.70','30.62','26.71','32.97','22.22','20.33','35.71','27.50','23.81','28.56'],
    ['z', 'Human', '-', '97.83','92.62','94.31','96.28','92.41','88.71','87.23','88.75','85.71','91.61'],
    ['g', 'Tool-Usage Methods'],
    ['z', 'HuggingGPT', '175B', '17.57','20.93','10.33','8.70','14.75','9.76','11.35','22.50','9.52','14.60'],
    ['z', 'VisualChatGPT', '&gt;175B', '30.09','36.28','7.78','43.48','29.92','33.33','21.99','21.25','28.57','25.92'],
    ['z', 'Chameleon', '-', '43.87','26.05','25.44','39.13','37.30','48.78','17.73','26.25','23.81','34.29'],
    ['g', 'Zero-shot Methods'],
    ['z', 'Qwen2.5-VL-7B', '7B', '83.89','59.77','47.45','81.11','76.03','79.67','41.43','30.00','28.57','59.79'],
    ['z', 'Qwen3-VL-8B', '8B', '86.73','65.77','45.86','82.22','77.27','77.24','34.29','32.50','38.10','61.43'],
    ['z', 'Qwen3.5-9B', '9B', '89.57','66.28','47.45','87.78','80.99','78.86','30.71','33.75','38.10','62.81'],
    ['z', 'Qwen3.8-Max', '-', '94.31','83.27','67.68','90.00','82.23','94.31','61.43','60.00','57.14','78.43'],
    ['z', 'Grok-4.6', '-', '93.84','85.19','73.89','91.11','75.62','94.31','70.71','72.50','53.38','81.02'],
    ['z', 'GPT-5.6-Sol', '-', '98.10','78.80','66.08','88.89','79.75','91.06','73.57','48.75','61.90','76.75'],
    ['z', 'Gemini-3.5-Flash', '-', '99.05','85.95','72.45','93.33','85.12','95.12','78.57','63.75','85.71','82.96'],
    ['z', 'Claude Sonnet 5', '-', '95.73','76.37','57.01','87.78','79.75','90.24','59.29','37.50','52.38','71.83'],
    ['z', 'Claude Opus 5', '-', '97.63','83.65','65.45','90.00','80.17','95.12','88.57','66.25','61.90','79.98'],
    ['z', 'Seed-2.1-Pro', '-', '96.68','72.67','65.13','88.89','78.93','89.43','68.57','56.25','28.57','73.77'],
    ['z', 'Kimi-K3', '2.8T', '97.16','86.72','70.38','91.11','78.51','95.93','77.86','60.00','57.14','81.32'],
    ['g', 'Fine-tuning Methods'],
    ['z', 'LLaVA-V1.5', '13B', '68.72','72.41','40.86','83.52','64.61','69.11','35.71','45.00','38.10','59.50'],
    ['z', 'Multimodal-CoT<sub>base</sub>', '223M', '41.71','46.49','39.90','59.34','60.91','27.64','48.57','35.00','28.57','44.85'],
    ['z', 'MC-CoT<sub>base</sub>', '223M', '53.55','63.98','43.56','61.54','69.55','29.27','42.86','33.75','28.57','53.51'],
    ['z', 'MIND<sub>base</sub>', '223M', '72.04','63.09','43.31','82.22','65.29','44.72','49.29','61.25','33.33','57.38'],
    ['', 'Qwen2.5-VL-7B', '7B', '92.42^','91.83^','60.35','84.44^','80.17*','86.18^','72.14^','70.00','71.43^','79.42'],
    ['', 'Qwen2.5-VL-7B + Multimodal-CoT', '7B', '87.20','89.27','61.62','83.33','74.38','86.18^','56.43','61.25','47.62','76.32'],
    ['', 'Qwen2.5-VL-7B + MIND', '7B', '92.42^','97.32*','76.27*','83.33','75.62','88.62*','66.43','71.25^','61.90','84.81^'],
    ['o', 'Qwen2.5-VL-7B + ReState (Ours)', '7B', '94.79*','97.32*','71.82^','85.56*','78.10^','86.18^','75.71*','78.75*','76.19*','84.99*'],
    ['', 'Qwen3-VL-8B', '8B', '93.84','90.55','68.31','86.67*','80.99^','89.43','74.29^','67.50','66.67^','81.62'],
    ['', 'Qwen3-VL-8B + Multimodal-CoT', '8B', '90.05','92.72','65.92','83.33','67.36','90.24','62.14','62.50','66.67^','78.95'],
    ['', 'Qwen3-VL-8B + MIND', '8B', '94.79^','97.96^','79.62*','85.56^','80.17','95.12*','68.57','77.50*','66.67^','87.45^'],
    ['o', 'Qwen3-VL-8B + ReState (Ours)', '8B', '95.73*','98.47*','78.03^','83.33','83.88*','92.68^','76.43*','76.25^','76.19*','87.96*'],
    ['', 'Qwen3.5-9B', '9B', '93.36','96.42','74.52','85.56^','80.58','84.55','70.00','71.25^','61.90^','84.73'],
    ['', 'Qwen3.5-9B + Multimodal-CoT', '9B', '91.00','89.66','59.87','85.56^','67.77','82.93','60.00','70.00','33.33','75.93'],
    ['', 'Qwen3.5-9B + MIND', '9B', '95.26^','98.08*','81.69*','85.56^','81.40^','85.37^','72.86^','83.75*','57.14','88.09^'],
    ['o', 'Qwen3.5-9B + ReState (Ours)', '9B', '95.73*','97.83^','80.89^','88.89*','83.47*','86.99*','80.00*','83.75*','90.48*','89.00*'],
    ],
  },
};

/* Tab.4 (lines 534-601) — break-down ablation on VersaCoT-10K.
   Row format: [scheme, URSM, SHS, ISR, [value, gap?] x 3 backbones]
   The parenthesised value is the remaining gap to full ReState (purple in the paper). */
const BREAKDOWN = {
  cols: ['Qwen2.5-VL-7B', 'Qwen3-VL-8B', 'Qwen3.5-9B'],
  rows: [
    ['Baseline',                    0, 0, 0, ['75.15', '+1.90'], ['75.65', '+3.60'], ['77.80', '+4.10']],
    ['Baseline w/ URSM',            1, 0, 0, ['75.65', '+1.40'], ['78.20', '+1.05'], ['78.95', '+2.95']],
    ['Baseline w/ URSM, CRSL(SHS)', 1, 1, 0, ['76.20', '+0.85'], ['78.50', '+0.75'], ['81.10', '+0.80']],
    ['Baseline w/ URSM, CRSL(ISR)', 1, 0, 1, ['76.20', '+0.85'], ['78.65', '+0.60'], ['79.45', '+2.45']],
    ['ReState (Final)',             1, 1, 1, ['77.05'],          ['79.25'],          ['81.90']],
  ],
};

const DOMAINS = [
  { name: 'Medical',  src: 'PMC-VQA',    desc: 'Medical imaging & clinical knowledge' },
  { name: 'Driving',  src: 'DrivingVQA', desc: 'Driving scenes, signs & safety' },
  { name: 'Common',   src: 'Visual7W',   desc: 'Everyday visual commonsense' },
  { name: 'Science',  src: 'AI2D',       desc: 'Scientific diagrams' },
  { name: 'Spatial',  src: 'CV-Bench',   desc: 'Spatial perception' },
  { name: 'Geometry', src: 'GeoQA',      desc: 'Geometric & mathematical reasoning' },
  { name: 'Chart',    src: 'ChartQA',    desc: 'Chart reading & computation' },
  { name: 'Expert',   src: 'MMMU',       desc: 'Multidisciplinary knowledge' },
];

/* rounds[].from : quality of the state fed into M_θ this round (post-hoc label — the
                   model itself is never told whether its state is right or wrong)
                   'empty' | 'neg' (contains an error) | 'pos' (already correct)
   rounds[].ok   : whether the model choice after this round is correct          */
const CASES = [
  {
    id: 'versacot', label: 'VersaCoT-10K · road sign', tag: 'VersaCoT-10K #5108 · Driving', fig: 'Fig. 14',
    img: 'assets/case_versacot.jpg',
    question: 'Will I be able to eat at the next highway rest area?',
    options: ['A. Yes', 'B. No'], answer: 0,
    note: 'Round 1 is distracted by the irrelevant crossed-out toilet icon. After two rounds of state feedback the model refocuses on the fork-and-knife icon, fixes the answer, then keeps it.',
    ref: 'The image shows a view from inside a vehicle driving on a highway. On the right side of the road, there is a blue highway information sign. The sign identifies the next rest area as “Aire de Solaize,” located 20 km ahead. Below the name and distance, there are two service pictograms: one depicting a fuel pump (indicating a gas station) and another depicting a crossed fork and spoon. The crossed fork and spoon symbol is the standard international road sign for a restaurant or dining facility. Therefore, the presence of this symbol on the sign for the upcoming rest area indicates that food services will be available there. The answer is (A).',
    rounds: [
      { from: 'empty', choice: 1, ok: false,
        cot: 'From the driver’s perspective on the highway, a blue sign on the right indicates the “Aire de Solize” rest area in 20 km. The sign includes two icons: a fork and knife for food services and a crossed-out toilet symbol. <e>The crossed-out toilet icon shows that the rest area lacks restrooms, which are often a key component of a full-service rest stop. Given the absence of a functional restroom, the rest area is unlikely to provide food services either.</e>' },
      { from: 'neg', choice: 1, ok: false,
        cot: 'The scene shows a highway with a blue sign on the right side announcing the “Aire de Solize” rest area in 20 km. The sign includes two icons: a fork and knife (denoting food services) and a toilet with a slash through it (denoting no restroom facilities). <e>The absence of the restroom icon suggests that the rest area is a basic stop with limited amenities, such as no food services.</e> Hence, you won’t be able to eat at the next highway rest area.' },
      { from: 'neg', choice: 0, ok: true,
        cot: 'The image captures a highway scene with a blue sign on the right indicating “Aire de Solize” is 20 km away. The sign displays two icons: a fork and knife (for dining) and a toilet with a slash (for no restrooms). <f>The presence of the fork and knife confirms that the rest area provides food services.</f> Therefore, you can eat at the next highway rest area.' },
      { from: 'pos', choice: 0, ok: true,
        cot: 'The image shows a highway with a blue sign on the right side indicating “Aire de Solize” is 20 km away. The sign includes two icons: a fork and knife (representing a restaurant or food service) and a toilet symbol with a red slash (indicating no restroom facilities). <f>The presence of the fork and knife icon confirms that the rest area provides food services.</f> Therefore, you will be able to eat at the next highway rest area.' },
    ],
  },
  {
    id: 'scienceqa', label: 'ScienceQA · food web', tag: 'ScienceQA #10709', fig: 'Fig. 15',
    img: 'assets/case_scienceqa.jpg',
    question: 'In this food web, which organism contains matter that eventually moves to the earthworm?',
    options: ['A. barren-ground caribou', 'B. mushroom', 'C. grizzly bear', 'D. bear sedge'], answer: 3,
    note: 'Round 1 constructs a wrong matter-transfer relation. Given its own state back, the model re-examines the arrow directions, corrects the relation, and preserves it afterwards.',
    ref: 'Use the arrows to follow how matter moves through this food web. For each answer choice, try to find a path of arrows to the earthworm. The only arrow pointing from the grizzly bear leads to the mushroom. No arrows point from the mushroom to any other organisms. So, in this food web, matter does not move from the grizzly bear to the earthworm. There are three paths matter can take from the bear sedge to the earthworm: bear sedge → brown lemming → Arctic fox → earthworm; bear sedge → brown lemming → snowy owl → earthworm; bear sedge → brown lemming → parasitic jaeger → rough-legged hawk → earthworm. … The answer is (D).',
    rounds: [
      { from: 'empty', choice: 0, ok: false,
        cot: 'Use arrow directions to map matter flow. Barren-ground caribou (A) connects to earthworms via two routes: <e>caribou → earthworm and caribou → grizzly bear → earthworm</e>. Mushroom (B) has no outgoing arrows, so matter stops there. Grizzly bear (C) transfers matter to mushroom, which doesn’t continue. Bear sedge (D) feeds lemmings, which then transfer to earthworms.' },
      { from: 'neg', choice: 3, ok: true,
        cot: 'Track matter flow by following arrows. For each option, find a path to the earthworm. <f>The barren-ground caribou’s arrows go to the grizzly bear and mushroom. The grizzly bear’s arrow ends at the mushroom, so matter doesn’t reach the earthworm.</f> The mushroom has no outgoing arrows, so it doesn’t transfer matter. <f>The bear sedge’s arrow leads to the brown lemming, which connects to the earthworm.</f>' },
      { from: 'pos', choice: 3, ok: true,
        cot: 'Follow the arrows to map matter movement. For each option, identify a path to the earthworm. The barren-ground caribou’s arrows go to the grizzly bear and mushroom. <f>The grizzly bear’s arrow ends at the mushroom, so matter doesn’t reach the earthworm.</f> The mushroom has no outgoing arrows, so it doesn’t transfer matter. <f>The bear sedge’s arrow leads to the brown lemming, which connects to the earthworm.</f>' },
    ],
  },
  {
    id: 'm3cot', label: 'M³CoT · buoyancy', tag: 'M³CoT #10416', fig: 'Fig. 16',
    img: 'assets/case_m3cot.jpg',
    question: 'In the provided image, how many items from the given choices will submerge underwater?',
    options: ['A. 2', 'B. 1', 'C. 0'], answer: 2,
    note: 'Round 1 already computes both densities correctly and concludes “neither sinks”, yet picks “B. 1”. The next update preserves the valid calculation and realigns the answer with it.',
    ref: 'Object D is made of rubber, weighs 3067.95 kg, and has a volume of 4.77 m³. Object C is made of glass, weighs 7891.41 kg, and has a volume of 16.42 m³. At 4 °C, water has a density of approximately 1000 kg/m³. Objects with a lower density than water float, while those with a higher density sink. The density of Object D is 643.18 kg/m³, so it floats. The density of Object C is 480.60 kg/m³, so it also floats. Therefore, 0 objects sink, and the answer is (C) 0.',
    rounds: [
      { from: 'empty', choice: 1, ok: false,
        cot: 'Step 1: The image lists Object D (rubber, 3067.95 kg, 4.77 m³) and Object C (glass, 7891.41 kg, 16.42 m³). Step 2: Water has a density of approximately 1000 kg/m³ at 4 °C; objects with lower density float, while objects with higher density sink. Step 3: Object D’s density is 3067.95 ÷ 4.77 ≈ 643.18 kg/m³, so it floats. Step 4: Object C’s density is 7891.41 ÷ 16.42 ≈ 480.60 kg/m³, so it also floats. <w>Steps 5–7: Neither object sinks; 0 items submerge.</w>' },
      { from: 'neg', choice: 2, ok: true,
        cot: 'Step 1: The image lists Object D (rubber, 3067.95 kg, 4.77 m³) and Object C (glass, 7891.41 kg, 16.42 m³). Step 2: Water has a density of approximately 1000 kg/m³ at 4 °C; objects with lower density float, while those with higher density sink. Steps 3–4: Object D’s density is 3067.95 ÷ 4.77 ≈ 643.18 kg/m³, and Object C’s density is 7891.41 ÷ 16.42 ≈ 480.60 kg/m³. Both float. <f>Steps 5–7: Neither sinks, so 0 objects are submerged. The answer is (C) 0.</f>' },
      { from: 'pos', choice: 2, ok: true,
        cot: 'Step 1: The image lists Object D (rubber, 3067.95 kg, 4.77 m³) and Object C (glass, 7891.41 kg, 16.42 m³). Step 2: At 4 °C, water has a density of 1000 kg/m³; objects with lower density float, while those with higher density sink. Steps 3–4: Object D’s density is 3067.95 ÷ 4.77 ≈ 643.18 kg/m³, and Object C’s density is 7891.41 ÷ 16.42 ≈ 480.60 kg/m³. <f>Steps 5–7: Both objects float, so 0 items sink. The answer is (C) 0.</f>' },
    ],
  },
];

/* Fig.8-13 — Direct SFT vs Multimodal-CoT vs MIND vs ReState on the same question */
const COMPARE = [
  { img: 'assets/cmp_versacot10k-case1.jpg', ds: 'VersaCoT-10K', title: 'Small-loan dilemma', fig: 'Fig. 8',
    gist: 'Baselines over-weight the “reciprocal relationship” cue and pick loan trust; ReState reads the whole diagram and identifies repayment ability.' },
  { img: 'assets/cmp_versacot10k-case2.jpg', ds: 'VersaCoT-10K', title: 'Rock cycle', fig: 'Fig. 9',
    gist: 'Baselines take E as the direct product of melting; ReState separates the magma region from solidified intrusive rock and picks A.' },
  { img: 'assets/cmp_scienceqa-case1.jpg', ds: 'ScienceQA', title: 'Fossil age', fig: 'Fig. 10',
    gist: 'All three baselines misread the layer order; ReState places the ginkgo leaf in the deeper, older layer.' },
  { img: 'assets/cmp_scienceqa-case2.jpg', ds: 'ScienceQA', title: 'Solution concentration', fig: 'Fig. 11',
    gist: 'Baselines conclude the two concentrations are equal; ReState compares particles per mL and picks Solution A.' },
  { img: 'assets/cmp_m3cot-case1.jpg', ds: 'M³CoT', title: 'Species recognition', fig: 'Fig. 12',
    gist: 'Baselines hallucinate reddish-brown spotted fur (Lynx rufus); ReState combines build, fur and face cues to reach Felis nigripes.' },
  { img: 'assets/cmp_m3cot-case2.jpg', ds: 'M³CoT', title: 'Tangram recognition', fig: 'Fig. 13',
    gist: 'Baselines see a kangaroo; ReState maps the pieces to body, wings and head and recognizes a penguin.' },
];
