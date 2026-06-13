---
layout: post
title: "Building a Variant Calling Pipeline from Scratch"
date: 2026-06-11
categories: [bioinformatics, tutorials]
tags: [python, snakemake, ngs, genomics]
excerpt: "A step-by-step guide to a reproducible NGS variant-calling pipeline — from raw reads to annotated variants — wired together with Snakemake."
image: /assets/images/blog/variant-pipeline-cover.png
toc: true
featured: true
---

Calling variants from sequencing data is one of those tasks that looks simple in
a slide deck and turns into a swamp of intermediate files the moment you try it
for real. In this post we build a small, **reproducible** pipeline that takes raw
FASTQ reads all the way to an annotated VCF — and does it the same way every time.

## The shape of the problem

A variant-calling workflow is a directed graph of steps, each consuming the
previous step's output:

1. Quality-trim the raw reads.
2. Align them to a reference genome.
3. Mark duplicates and sort.
4. Call variants.
5. Filter and annotate.

The trouble is never any single step — it's keeping all five **in sync** as
inputs change. That is exactly what a workflow manager is for.

![The pipeline as a directed acyclic graph, from FASTQ to annotated VCF.](/assets/images/blog/pipeline-dag.png)

> Reproducibility is not a feature you add at the end. It is a property you keep
> from the first command you run.

## Wiring it with Snakemake

Each rule declares its inputs and outputs; Snakemake works out the order and only
re-runs what changed.

```python
rule bwa_map:
    input:
        ref="ref/genome.fa",
        reads="trimmed/{sample}.fq.gz",
    output:
        "aligned/{sample}.bam",
    threads: 8
    shell:
        "bwa mem -t {threads} {input.ref} {input.reads} "
        "| samtools sort -o {output} -"
```

The `{sample}` wildcard means this one rule covers every sample in the cohort —
no copy-paste, no drift.

### Driving the run

From the project root, a dry run shows the plan before anything executes:

```bash
# Preview the DAG without running anything
snakemake -n --cores 8

# Then run for real, keeping a log
snakemake --cores 8 2>&1 | tee logs/run.log
```

## Why it holds up

Because every output is a declared function of its inputs, deleting `aligned/`
and re-running reproduces the **exact** same BAMs. Hand the repository to a
colleague and they get your results, not an approximation of them.

In the next post we'll add a `conda` environment per rule so the tool versions
travel with the workflow too.
