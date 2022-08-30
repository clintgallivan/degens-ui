export default function UseScoreLabelGenerator(score: number) {
  const baseScore = 65;
  const multiplier = [1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65];
  const thresholds = [baseScore];
  const scoreThreshold = () => {
    for (let i in multiplier) {
      thresholds.push(multiplier[i] * thresholds[thresholds.length - 1]);
    }
  };
  scoreThreshold();

  const scoreLabelPairs = [
    { score: thresholds[0], label: 'Boomer' },
    { score: thresholds[1], label: 'Normie' },
    { score: thresholds[2], label: 'Crypto Bro' },
    { score: thresholds[3], label: 'Degen' },
    { score: thresholds[4], label: 'Wojak' },
    { score: thresholds[5], label: 'Pepe' },
    { score: thresholds[6], label: 'Chad' },
    { score: thresholds[7], label: 'Giga-Chad' },
    { score: thresholds[8], label: 'The Oracle' },
    { score: thresholds[9], label: 'The Dogefather' },
    { score: thresholds[10], label: `Vitalik's Son` },
    { score: thresholds[11], label: 'Satoshi' },
    // { score: 'none', label: 'Maxed Out!' },
  ];

  let currentLabel: any = '--';
  let previousThreshold: any = '';
  let nextThreshold: any = '';
  const getCurrentLabel = () => {
    if (score < scoreLabelPairs[0]['score']) {
      currentLabel = scoreLabelPairs[0]['label'];
      nextThreshold = Math.round(scoreLabelPairs[0]['score']);
    } else if (score < scoreLabelPairs[1]['score']) {
      currentLabel = scoreLabelPairs[1]['label'];
      nextThreshold = Math.round(scoreLabelPairs[1]['score']);
      previousThreshold = Math.round(scoreLabelPairs[0]['score']);
    } else if (score < scoreLabelPairs[2]['score']) {
      currentLabel = scoreLabelPairs[2]['label'];
      nextThreshold = Math.round(scoreLabelPairs[2]['score']);
      previousThreshold = Math.round(scoreLabelPairs[1]['score']);
    } else if (score < scoreLabelPairs[3]['score']) {
      currentLabel = scoreLabelPairs[3]['label'];
      nextThreshold = Math.round(scoreLabelPairs[3]['score']);
      previousThreshold = Math.round(scoreLabelPairs[2]['score']);
    } else if (score < scoreLabelPairs[4]['score']) {
      currentLabel = scoreLabelPairs[4]['label'];
      nextThreshold = Math.round(scoreLabelPairs[4]['score']);
      previousThreshold = Math.round(scoreLabelPairs[3]['score']);
    } else if (score < scoreLabelPairs[5]['score']) {
      currentLabel = scoreLabelPairs[5]['label'];
      nextThreshold = Math.round(scoreLabelPairs[5]['score']);
      previousThreshold = Math.round(scoreLabelPairs[4]['score']);
    } else if (score < scoreLabelPairs[6]['score']) {
      currentLabel = scoreLabelPairs[6]['label'];
      nextThreshold = Math.round(scoreLabelPairs[6]['score']);
      previousThreshold = Math.round(scoreLabelPairs[5]['score']);
    } else if (score < scoreLabelPairs[7]['score']) {
      currentLabel = scoreLabelPairs[7]['label'];
      nextThreshold = Math.round(scoreLabelPairs[7]['score']);
      previousThreshold = Math.round(scoreLabelPairs[6]['score']);
    } else if (score < scoreLabelPairs[8]['score']) {
      currentLabel = scoreLabelPairs[8]['label'];
      nextThreshold = Math.round(scoreLabelPairs[8]['score']);
      previousThreshold = Math.round(scoreLabelPairs[7]['score']);
    } else if (score < scoreLabelPairs[9]['score']) {
      currentLabel = scoreLabelPairs[9]['label'];
      nextThreshold = Math.round(scoreLabelPairs[9]['score']);
      previousThreshold = Math.round(scoreLabelPairs[8]['score']);
    } else if (score < scoreLabelPairs[10]['score']) {
      currentLabel = scoreLabelPairs[10]['label'];
      nextThreshold = Math.round(scoreLabelPairs[10]['score']);
      previousThreshold = Math.round(scoreLabelPairs[9]['score']);
    } else if (score >= scoreLabelPairs[10]['score']) {
      currentLabel = scoreLabelPairs[11]['label'];
      nextThreshold = Math.round(scoreLabelPairs[11]['score']);
      previousThreshold = Math.round(scoreLabelPairs[10]['score']);
    }
  };
  getCurrentLabel();

  let currentPercentage = 0;
  const calcCurrentPercentage = () => {
    if (nextThreshold && previousThreshold) {
      const totalScore = nextThreshold - previousThreshold;
      const completedScore = score - previousThreshold;
      currentPercentage = (completedScore / totalScore) * 100;
    }
    if (!nextThreshold && previousThreshold) {
      currentPercentage = 100;
    }
    if (nextThreshold && !previousThreshold) {
      const totalScore = nextThreshold;
      const completedScore = score / nextThreshold;
      currentPercentage = completedScore * 100;
    }
  };
  calcCurrentPercentage();

  return {
    currentLabel,
    previousThreshold,
    nextThreshold,
    currentPercentage,
    scoreLabelPairs,
  };
}
