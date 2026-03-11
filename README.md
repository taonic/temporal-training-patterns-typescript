# Temporal Design Patterns - TypeScript

Hands-on exercises for five essential Temporal design patterns.

## Prerequisites
- Node.js 18+
- Temporal CLI

### Installing Temporal CLI

**macOS (Homebrew):**
```bash
brew install temporal
```

**Linux:**
```bash
curl -sSf https://temporal.download/cli.sh | sh
```

## Setup

1. Start Temporal dev server:
```bash
temporal server start-dev
```

2. Install dependencies:
```bash
npm install
```

## Exercise Progression

### [Exercise 1: Early Return](exercise1-early-return/) (30 min)
- Update-with-Start for immediate client feedback
- Two-phase execution: fast init + slow completion
- `defineUpdate`, `condition()`, `proxyLocalActivities`

### [Exercise 2: Parallel Execution](exercise2-parallel-execution/) (30 min)
- Concurrent activity execution with `Promise.all()`
- Fan-out/fan-in pattern
- Performance comparison: sequential vs parallel

### [Exercise 3: Saga Pattern](exercise3-saga/) (30 min)
- Distributed transaction management
- Compensation actions in reverse order
- Consistency across multiple services

### [Exercise 4: Long-Running Activity](exercise4-long-running-activity/) (30 min)
- Heartbeats for progress tracking and checkpointing
- Resume from last checkpoint after worker restart
- Graceful cancellation handling

### [Exercise 5: Entity Workflow](exercise5-entity-workflow/) (30 min)
- One workflow per business entity
- Signals, updates, and queries
- Continue-As-New for unbounded lifetime

## Running Exercises

```bash
# Terminal 1 - Start worker
npx ts-node exercise1-early-return/src/worker/index.ts

# Terminal 2 - Run starter
npx ts-node exercise1-early-return/src/starter/index.ts
```

Replace `exercise1-early-return` with any exercise or solution directory for reference implementations.

## Pattern Reference

| Pattern | Key APIs | Use When |
|---------|----------|----------|
| Early Return | `startWithUpdate`, `defineUpdate`, `condition` | Need immediate feedback from long operation |
| Parallel Execution | `Promise.all()` | Independent operations that can run concurrently |
| Saga | `proxyActivities`, compensations array | Multi-step process needing rollback on failure |
| Long-Running Activity | `context.heartbeat`, `heartbeatDetails` | Activities running minutes to hours |
| Entity Workflow | `defineSignal`, `defineUpdate`, `continueAsNew` | Long-lived entities with state transitions |
