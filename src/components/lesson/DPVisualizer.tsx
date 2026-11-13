'use client';

import React, { useId, useMemo, useState } from 'react';
import {
  SkipBack,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import type { CoinChangePreset } from '@/types';

const INF = 1_000_000_000;

interface DPStepSnapshot {
  stepIndex: number;
  currentS: number | null;
  currentCoin: number | null;
  prevS: number | null;
  dp: number[];
  lastCoinChoice: Array<number | null>;
  outcome: 'init' | 'skip-too-large' | 'skip-inf' | 'updated' | 'kept' | 'complete';
  explanation: string;
  formulaEvaluation: string;
}

function buildDPSteps(coins: number[], target: number): DPStepSnapshot[] {
  const steps: DPStepSnapshot[] = [];
  const dp = new Array<number>(target + 1).fill(INF);
  const lastCoinChoice = new Array<number | null>(target + 1).fill(null);
  dp[0] = 0;

  steps.push({
    stepIndex: 0,
    currentS: 0,
    currentCoin: null,
    prevS: null,
    dp: [...dp],
    lastCoinChoice: [...lastCoinChoice],
    outcome: 'init',
    explanation:
      'Khởi tạo Base Case: dp[0] = 0 (cần 0 đồng xu để tạo tổng 0). Tất cả trạng thái dp[1..S] được gán bằng INF (chưa tìm được phương án).',
    formulaEvaluation: 'dp[0] = 0, dp[1..' + target + '] = INF',
  });

  for (let s = 1; s <= target; s++) {
    for (const coin of coins) {
      if (s < coin) {
        steps.push({
          stepIndex: steps.length,
          currentS: s,
          currentCoin: coin,
          prevS: null,
          dp: [...dp],
          lastCoinChoice: [...lastCoinChoice],
          outcome: 'skip-too-large',
          explanation: `Đang tính dp[${s}] với mệnh giá xu ${coin}: Vì s = ${s} < ${coin} nên không thể dùng đồng xu mệnh giá ${coin}. Bỏ qua.`,
          formulaEvaluation: `s = ${s} < coin (${coin}) -> bỏ qua`,
        });
        continue;
      }

      const prev = s - coin;
      if (dp[prev] === INF) {
        steps.push({
          stepIndex: steps.length,
          currentS: s,
          currentCoin: coin,
          prevS: prev,
          dp: [...dp],
          lastCoinChoice: [...lastCoinChoice],
          outcome: 'skip-inf',
          explanation: `Đang tính dp[${s}] với xu ${coin}: Trạng thái lùi dp[${s} - ${coin}] = dp[${prev}] đang là INF (bất khả thi). KHÔNG cộng 1 vào INF để tránh tràn số hoặc nhận trạng thái giả!`,
          formulaEvaluation: `dp[${prev}] == INF -> KHÔNG tính INF + 1`,
        });
        continue;
      }

      const candidate = dp[prev] + 1;
      const oldVal = dp[s];
      if (candidate < oldVal) {
        dp[s] = candidate;
        lastCoinChoice[s] = coin;
        steps.push({
          stepIndex: steps.length,
          currentS: s,
          currentCoin: coin,
          prevS: prev,
          dp: [...dp],
          lastCoinChoice: [...lastCoinChoice],
          outcome: 'updated',
          explanation: `Đang tính dp[${s}] với xu ${coin}: Từ dp[${prev}] = ${dp[prev]} (hợp lệ), thử cộng 1 đồng xu ${coin} được ${candidate} xu < ${oldVal === INF ? 'INF' : oldVal}. Cập nhật dp[${s}] = ${candidate}.`,
          formulaEvaluation: `dp[${s}] = min(${oldVal === INF ? 'INF' : oldVal}, dp[${prev}] + 1) = min(${oldVal === INF ? 'INF' : oldVal}, ${candidate}) = ${candidate}`,
        });
      } else {
        steps.push({
          stepIndex: steps.length,
          currentS: s,
          currentCoin: coin,
          prevS: prev,
          dp: [...dp],
          lastCoinChoice: [...lastCoinChoice],
          outcome: 'kept',
          explanation: `Đang tính dp[${s}] với xu ${coin}: Phương án từ dp[${prev}] + 1 = ${candidate} xu không tốt hơn giá trị hiện tại dp[${s}] = ${oldVal}. Giữ nguyên dp[${s}] = ${oldVal}.`,
          formulaEvaluation: `dp[${s}] = min(${oldVal}, dp[${prev}] + 1) = min(${oldVal}, ${candidate}) = ${oldVal}`,
        });
      }
    }
  }

  // Reconstruct optimal coins if reachable
  let summaryText = '';
  if (dp[target] === INF) {
    summaryText = `Hoàn tất bảng DP: dp[${target}] = INF -> Không thể tạo được tổng ${target} từ bộ xu [${coins.join(', ')}] (Kết quả trả về -1).`;
  } else {
    const chosen: number[] = [];
    let cur = target;
    while (cur > 0 && lastCoinChoice[cur] !== null) {
      const c = lastCoinChoice[cur]!;
      chosen.push(c);
      cur -= c;
    }
    summaryText = `Hoàn tất bảng DP: Tổng S = ${target} cần ít nhất dp[${target}] = ${dp[target]} đồng xu (Tập xu tối ưu: ${chosen.join(' + ')} = ${target}).`;
  }

  steps.push({
    stepIndex: steps.length,
    currentS: target,
    currentCoin: null,
    prevS: null,
    dp: [...dp],
    lastCoinChoice: [...lastCoinChoice],
    outcome: 'complete',
    explanation: summaryText,
    formulaEvaluation: `Kết quả cuối: dp[${target}] = ${dp[target] === INF ? 'INF (-1)' : dp[target]}`,
  });

  return steps;
}

const DEFAULT_PRESETS: CoinChangePreset[] = [
  {
    id: 'preset-134-6',
    label: 'Ví dụ chuẩn: Xu [1, 3, 4], Tổng S = 6',
    coins: [1, 3, 4],
    target: 6,
    note: 'Minh họa dp[6] đạt 2 xu (3 + 3) thay vì 3 xu (4 + 1 + 1) của thuật toán Tham lam.',
  },
  {
    id: 'preset-25-7',
    label: 'Trạng thái INF: Xu [2, 5], Tổng S = 7',
    coins: [2, 5],
    target: 7,
    note: 'Minh họa các tổng lẻ s = 1, 3 giữ nguyên INF và lý do không lấy INF + 1.',
  },
  {
    id: 'preset-125-8',
    label: 'Hệ tiền tệ chuẩn: Xu [1, 2, 5], Tổng S = 8',
    coins: [1, 2, 5],
    target: 8,
    note: 'Minh họa chuỗi truy vết nghiệm từ dp[8] = 3 (5 + 2 + 1).',
  },
];

export function DPVisualizer({
  title = 'Mô phỏng từng bước Quy hoạch động 1 chiều: Đổi tiền ít nhất',
  description = 'Quan sát cách bảng dp[0..S] chuyển trạng thái từ dp[0] = 0 theo công thức dp[s] = min(dp[s], dp[s - coin] + 1) khi dp[s - coin] != INF.',
  presets = DEFAULT_PRESETS,
}: {
  title?: string;
  description?: string;
  presets?: CoinChangePreset[];
}) {
  const presetSelectId = useId();
  const safePresets = presets.length > 0 ? presets : DEFAULT_PRESETS;
  const [selectedPresetId, setSelectedPresetId] = useState<string>(safePresets[0].id);
  const [stepIdx, setStepIdx] = useState<number>(0);

  const activePreset =
    safePresets.find((p) => p.id === selectedPresetId) ?? safePresets[0];

  const steps = useMemo(
    () => buildDPSteps(activePreset.coins, activePreset.target),
    [activePreset.coins, activePreset.target]
  );

  const clampedIdx = Math.min(stepIdx, steps.length - 1);
  const currentStep = steps[clampedIdx];

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    setStepIdx(0);
  };

  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-indigo-200/90 bg-white p-5 shadow-xs sm:p-6 dark:border-indigo-900/60 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Interactive Algorithm Visualizer</span>
          </div>
          <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={presetSelectId}
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Bộ dữ liệu mô phỏng:
          </label>
          <select
            id={presetSelectId}
            value={activePreset.id}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {safePresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metadata pills */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-2.5 text-xs dark:bg-slate-800/70">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Mệnh giá xu:{' '}
            <strong className="font-mono text-indigo-700 dark:text-indigo-300">
              [{activePreset.coins.join(', ')}]
            </strong>
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Tổng cần đổi:{' '}
            <strong className="font-mono text-indigo-700 dark:text-indigo-300">
              S = {activePreset.target}
            </strong>
          </span>
          {currentStep.currentCoin !== null ? (
            <span className="rounded bg-amber-100 px-2 py-0.5 font-mono font-semibold text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
              Đang thử coin = {currentStep.currentCoin}
            </span>
          ) : null}
        </div>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          Bước {clampedIdx} / {steps.length - 1}
        </span>
      </div>

      {/* DP Array Table */}
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="inline-flex min-w-full gap-2">
          {currentStep.dp.map((val, s) => {
            const isCurrentTarget = currentStep.currentS === s;
            const isPrevSource = currentStep.prevS === s;
            const isInf = val === INF;

            let boxClass =
              'border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200';
            if (isCurrentTarget) {
              boxClass =
                'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/30 dark:border-indigo-400 dark:bg-indigo-950/80 dark:text-white';
            } else if (isPrevSource) {
              boxClass =
                currentStep.outcome === 'skip-inf'
                  ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/30 dark:border-rose-500 dark:bg-rose-950/70 dark:text-rose-200'
                  : 'border-teal-600 bg-teal-50 text-teal-950 ring-2 ring-teal-500/30 dark:border-teal-400 dark:bg-teal-950/80 dark:text-teal-200';
            }

            return (
              <div
                key={s}
                className={`flex min-w-[74px] flex-1 flex-col items-center justify-between rounded-xl border p-2.5 transition ${boxClass}`}
              >
                <span className="font-mono text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  s = {s}
                </span>
                <span
                  className={`my-1.5 font-mono text-base font-bold ${
                    isInf
                      ? 'text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {isInf ? 'INF' : val}
                </span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  {s === 0
                    ? 'Base'
                    : currentStep.lastCoinChoice[s]
                      ? `+xu ${currentStep.lastCoinChoice[s]}`
                      : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs border border-indigo-600 bg-indigo-200 dark:bg-indigo-500" />
          <span>Trạng thái đang tính dp[s]</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs border border-teal-600 bg-teal-200 dark:bg-teal-500" />
          <span>Trạng thái lùi hợp lệ dp[s - coin]</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-xs border border-rose-500 bg-rose-200 dark:bg-rose-500" />
          <span>Trạng thái lùi bị chặn vì bằng INF</span>
        </span>
      </div>

      {/* Step Explanation Box */}
      <div
        aria-live="polite"
        className={`mt-4 rounded-xl border p-4 ${
          currentStep.outcome === 'skip-inf'
            ? 'border-rose-200 bg-rose-50/70 dark:border-rose-900/70 dark:bg-rose-950/40'
            : currentStep.outcome === 'updated' || currentStep.outcome === 'complete'
              ? 'border-teal-200 bg-teal-50/70 dark:border-teal-900/70 dark:bg-teal-950/40'
              : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60'
        }`}
      >
        <div className="flex items-start gap-2.5">
          {currentStep.outcome === 'skip-inf' ? (
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400"
              aria-hidden="true"
            />
          ) : (
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
              aria-hidden="true"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              {currentStep.formulaEvaluation}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
              {currentStep.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStepIdx(0)}
            disabled={clampedIdx === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Đặt lại (Bước 0)</span>
          </button>

          <button
            type="button"
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            disabled={clampedIdx === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Bước trước</span>
          </button>

          <button
            type="button"
            onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
            disabled={clampedIdx >= steps.length - 1}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <span>Bước tiếp</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setStepIdx(steps.length - 1)}
            disabled={clampedIdx >= steps.length - 1}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <span>Kết quả cuối</span>
            <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">{activePreset.note}</p>
      </div>
    </section>
  );
}
