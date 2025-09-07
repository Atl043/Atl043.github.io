---
description: TypeScript Style Guide based on Google's TypeScript Style Guide and Microsoft Personnel ADR 0006 - Comprehensive rules for TypeScript development in the CCM Portal project
version: 2.0
tags:
  [
    "typescript",
    "style-guide",
    "code-standards",
    "react",
    "frontend",
    "microsoft-standards",
    "sdl-compliance",
  ]
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
---

# TypeScript Style Guide

**Objective:** Ensure consistent, readable, and maintainable TypeScript code across the CCM Portal project by following Google's TypeScript Style Guide principles, Microsoft Personnel Standards (ADR 0006), and SDL security requirements.

**Core Principle:** Write code that is clear, consistent, and follows established conventions to improve team collaboration and code maintainability while meeting Microsoft security and compliance standards.

---

## 1. Source File Basics

### 1.1 File Encoding

- Source files **must** be encoded in **UTF-8**
- Use only ASCII horizontal space character (0x20) for whitespace
- Use special escape sequences (`\'`, `\"`, `\\`, `\b`, `\f`, `\n`, `\r`, `\t`, `\v`) instead of numeric escapes

```typescript
// ✅ Good - Use actual Unicode characters when clear
const units = "μs";
const infinity = "∞";

// ✅ Good - Use escapes for non-printable characters with comments
const output = "\uFEFF" + content; // byte order mark

// ❌ Avoid - Hard to read numeric escapes
const units = "\u03BCs"; // Greek letter mu, 's'
const output = "\uFEFF" + content; // Reader has no idea what this is
```

### 1.2 Source File Structure

Files **must** consist of the following **in order**, with exactly one blank line separating each section:

1. Copyright information (if present)
2. JSDoc with `@fileoverview` (if present)
3. Imports (if present)
4. The file's implementation

```typescript
/**
 * @fileoverview ConMon coverage table component for displaying vulnerability
 * scan coverage across different time periods and environments.
 */

// Node modules
import React, { useState, useEffect } from 'react';
import { DetailsList, IColumn } from '@fluentui/react';

// Internal modules
import { CoverageService } from '@/services/CoverageService';
import { ApiClient } from '@/utils/ApiClient';

// Relative imports
import { CoverageFilter } from './CoverageFilter';
import './CoverageTable.scss';

// Implementation
export const CoverageTable: React.FC<CoverageTableProps> = ({ ... }) => {
  // Component implementation
};
```

---

## 2. Import and Export Guidelines

### 2.1 Import Types and Organization

**Group and order imports consistently:**

```typescript
// ✅ Correct - Grouped and ordered imports
// 1. Node modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router } from "express";

// 2. Internal modules (absolute imports)
import { UserService } from "@/services/UserService";
import { ApiClient } from "@/utils/ApiClient";
import { CONFIG } from "@/config/constants";

// 3. Relative imports
import { validateInput } from "../utils/validation";
import { CustomerCard } from "./CustomerCard";
import "./ComponentName.scss";

// ❌ Avoid - Mixed import groups
import { CustomerCard } from "./CustomerCard";
import React from "react";
import { UserService } from "@/services/UserService";
import axios from "axios";
```

**Use import type for type-only imports:**

```typescript
// ✅ Correct - Use import type for types
import type { CoverageData, PoamItem } from "@/types/ConMonTypes";
import { CoverageService } from "@/services/CoverageService";

// ✅ Correct - Mixed imports
import { type CoverageData, CoverageService } from "@/services/CoverageService";

// ❌ Avoid - Regular import for type-only usage
import { CoverageData } from "@/types/ConMonTypes"; // Only used as type
```

### 2.2 Namespace vs Named Imports

**Prefer named imports for frequently used symbols:**

```typescript
// ✅ Good - Named imports for common functions
import { describe, it, expect } from "./testing";

describe("ConMon coverage calculation", () => {
  it("should calculate correct percentages", () => {
    expect(calculateCoverage(data)).toBe(85);
  });
});

// ❌ Avoid - Unnecessary namespace for simple cases
import * as testing from "./testing";

testing.describe("ConMon coverage calculation", () => {
  testing.it("should calculate correct percentages", () => {
    testing.expect(calculateCoverage(data)).toBe(85);
  });
});
```

**Use namespace imports for large APIs:**

```typescript
// ✅ Good - Namespace import for many symbols
import * as ConMonApi from "@/api/ConMonApi";

const coverage = ConMonApi.getCoverageData();
const poams = ConMonApi.getPoamData();
const settings = ConMonApi.getSettings();

// ❌ Avoid - Long named import list
import {
  getCoverageData as ConMonGetCoverageData,
  getPoamData as ConMonGetPoamData,
  getSettings as ConMonGetSettings,
  // ... many more imports
} from "@/api/ConMonApi";
```

### 2.3 Export Guidelines

**Use named exports - avoid default exports:**

```typescript
// ✅ Good - Named exports
export class CoverageService {
  // Implementation
}

export interface CoverageData {
  id: number;
  percentage: number;
}

export const validateCoverageInput = (input: string): boolean => {
  return input.length > 0;
};

// ❌ Avoid - Default exports
export default class CoverageService {
  // Implementation
}

// ❌ Avoid - Container classes
export class ConMonUtils {
  static readonly DEFAULT_COVERAGE = 0;
  static calculatePercentage() {
    return 0;
  }
}

// ✅ Better - Individual exports
export const DEFAULT_COVERAGE = 0;
export function calculatePercentage(): number {
  return 0;
}
```

**Export visibility - only export what's used externally:**

```typescript
// ✅ Good - Minimal API surface
export class CoverageCalculator {
  // Public API
  public calculateCoverage(data: CoverageData[]): number {
    return this.processData(data);
  }

  // Private implementation details
  private processData(data: CoverageData[]): number {
    // Implementation
  }
}

// ❌ Avoid - Exposing internal details
export class CoverageCalculator {
  public calculateCoverage(data: CoverageData[]): number {
    return this.processData(data);
  }

  public processData(data: CoverageData[]): number {
    // Shouldn't be public
    // Implementation
  }
}
```

---

## 3. Language Features

### 3.1 Variable Declarations

**Always use `const` and `let` - never `var`:**

```typescript
// ✅ Good - Use const by default
const maxRetryAttempts = 3;
const coverageData: CoverageData[] = [];

// ✅ Good - Use let when reassignment is needed
let currentPage = 1;
let filteredResults: PoamItem[] = [];

// ❌ Avoid - Never use var
var pageSize = 20; // Function-scoped, confusing behavior

// ✅ Good - One variable per declaration
const userName = "john.doe";
const isActive = true;

// ❌ Avoid - Multiple variables in one declaration
let currentUser = null,
  isLoading = false;
```

### 3.2 Array Literals

**Use bracket notation, not Array constructor:**

```typescript
// ✅ Good - Bracket notation
const coverageItems: CoverageData[] = [];
const selectedIds = [1, 2, 3];

// ✅ Good - Array.from for specific sizes
const emptySlots = Array.from<number>({ length: 5 }).fill(0);

// ❌ Avoid - Array constructor
const items = new Array(2); // [undefined, undefined] - confusing
const values = new Array(2, 3); // [2, 3] - inconsistent behavior
```

**Use spread syntax appropriately:**

```typescript
// ✅ Good - Spread for arrays
const originalItems = [1, 2, 3];
const newItems = [...originalItems, 4, 5];
const combined = [...firstArray, ...secondArray];

// ✅ Good - Array destructuring
const [first, second, ...rest] = generateResults();
const [, , third] = someArray; // Skip unused elements

// ❌ Avoid - Spreading non-iterables
const numbers = [1, 2, 3];
const result = { ...numbers }; // Creates {0: 1, 1: 2, 2: 3} - confusing
```

### 3.3 Object Literals

**Use object literals, not Object constructor:**

```typescript
// ✅ Good - Object literals
const coverageConfig = {
  maxItems: 100,
  enableFiltering: true,
  defaultSort: "date",
};

const emptyConfig = {};

// ❌ Avoid - Object constructor
const config = new Object(); // Unnecessary
```

**Use spread syntax for shallow copying:**

```typescript
// ✅ Good - Object spread
const defaultSettings = { theme: "light", pageSize: 20 };
const userSettings = { ...defaultSettings, theme: "dark" };

const updatedPoam = { ...existingPoam, status: "completed" };

// ❌ Avoid - Spreading non-objects
const array = [1, 2, 3];
const spreadArray = { ...array }; // Creates {0: 1, 1: 2, 2: 3} - confusing
```

### 3.4 Classes

**Class declarations must not end with semicolons:**

```typescript
// ✅ Good - No semicolon after class declaration
class CoverageService {
  private readonly apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public async getCoverage(): Promise<CoverageData[]> {
    return await this.apiClient.get("/coverage");
  }
}

// ✅ Good - Semicolon for class expressions
export const ServiceFactory = class {
  createService(): CoverageService {
    return new CoverageService();
  }
}; // Semicolon needed here
```

**Use parameter properties to reduce boilerplate:**

```typescript
// ✅ Good - Parameter properties
class CoverageCalculator {
  constructor(
    private readonly logger: Logger,
    private readonly config: CoverageConfig
  ) {}

  public calculate(): number {
    return this.performCalculation();
  }
}

// ❌ Avoid - Manual property assignment
class CoverageCalculator {
  private readonly logger: Logger;
  private readonly config: CoverageConfig;

  constructor(logger: Logger, config: CoverageConfig) {
    this.logger = logger;
    this.config = config;
  }
}
```

**Use readonly for immutable properties:**

```typescript
// ✅ Good - Readonly properties
class PoamProcessor {
  private readonly maxBatchSize = 100;
  private readonly apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }
}

// ❌ Avoid - Private fields (#)
class PoamProcessor {
  #maxBatchSize = 100; // Not supported in older environments
}
```

### 3.5 Functions

**Prefer function declarations for named functions:**

```typescript
// ✅ Good - Function declaration
function calculateCoveragePercentage(covered: number, total: number): number {
  return (covered / total) * 100;
}

// ✅ Good - Arrow functions for callbacks
const processItems = (items: PoamItem[]) => {
  return items.filter((item) => item.isActive);
};

// ❌ Avoid - Function expressions
const calculatePercentage = function (covered: number, total: number): number {
  return (covered / total) * 100;
};
```

**Use arrow functions appropriately:**

```typescript
// ✅ Good - Arrow function with block body when return value unused
myPromise.then((result) => {
  console.log("Processing completed");
  logResult(result);
});

// ✅ Good - Concise body when return value is used
const activePoams = allPoams.filter((poam) => poam.status === "active");
const coverageIds = coverageData.map((item) => item.id);

// ❌ Avoid - Concise body when return value is unused
myPromise.then((result) => console.log(result)); // Leaked return value

// ✅ Better - Explicit void or block body
myPromise.then((result) => void console.log(result));
myPromise.then((result) => {
  console.log(result);
});
```

---

## 4. Naming Conventions

### 4.1 Identifier Rules

**Use descriptive names - avoid abbreviations:**

```typescript
// ✅ Good - Clear and descriptive
const maxRetryAttempts = 3;
const isUserAuthenticated = true;
const coverageCalculationResult: CoverageData[] = [];

function calculateTotalVulnerabilityCount(poams: PoamItem[]): number {
  return poams.reduce((sum, poam) => sum + poam.vulnerabilityCount, 0);
}

interface ConMonDashboardSettings {
  refreshIntervalMinutes: number;
  enableAutoRefresh: boolean;
  defaultTimeRange: TimeRange;
}

// ❌ Avoid - Unclear abbreviations
const mra = 3; // max retry attempts?
const flag = true; // what flag?
const data: any[] = []; // what kind of data?

function calcVulnCnt(p: any[]): number {
  // Hard to understand
  return p.reduce((s, i) => s + i.vc, 0);
}

interface CMDSettings {
  // Acronym without context
  refInt: number;
  enAR: boolean;
}
```

### 4.2 Naming Style Rules

**camelCase for variables, functions, methods, properties:**

```typescript
// ✅ Correct
const currentUserAccount = getCurrentUser();
const isValidEmailAddress = validateEmail(email);

function processVulnerabilityData(data: VulnerabilityData): ProcessedData {
  return processData(data);
}

class ConMonService {
  private readonly databaseConnection: Connection;

  public async getPoamData(filters: PoamFilters): Promise<PoamData[]> {
    return await this.queryDatabase(filters);
  }

  private queryDatabase(filters: PoamFilters): Promise<PoamData[]> {
    // Implementation
  }
}
```

**PascalCase for types, classes, enums, interfaces, decorators:**

```typescript
// ✅ Correct - Types and Interfaces (Microsoft ADR 0006: No "I" prefix)
interface CoverageTableConfiguration {
  columnCount: number;
  sortDirection: SortDirection;
  filterSettings: FilterConfiguration;
}

// ✅ Correct - Props interfaces must use "Props" suffix (Microsoft ADR 0006)
interface CoverageTableProps {
  data: CoverageData[];
  loading: boolean;
  onRefresh: () => void;
}

interface PoamFormProps {
  initialData?: PoamData;
  onSubmit: (data: PoamData) => void;
  onCancel: () => void;
}

type VulnerabilityRiskLevel = "low" | "medium" | "high" | "critical";

class PoamDataProcessor {
  // Implementation
}

enum ConMonViewType {
  Coverage = "coverage",
  Poams = "poams",
  Dashboard = "dashboard",
}

// ✅ Correct - Decorators (when used)
@Component({
  selector: "conmon-coverage-table",
})
export class CoverageTableComponent {
  // Implementation
}

// ❌ Avoid - "I" prefix for interfaces (Microsoft ADR 0006)
interface ICoverageService {
  // Should be CoverageService
  getCoverage(): Promise<CoverageData[]>;
}

// ❌ Avoid - Props interfaces without "Props" suffix
interface CoverageTableComponentProps {
  // Should be CoverageTableProps
  data: CoverageData[];
}
```

### 4.2.1 Microsoft ADR 0006: Boolean Variable Naming

**Boolean variables must start with is|has|can|did|should|will|show:**

```typescript
// ✅ Correct - Microsoft ADR 0006 boolean naming
const isUserAuthenticated = checkAuthentication();
const hasPermission = user.permissions.includes("admin");
const canEditPoam = user.role === "administrator" || user.role === "editor";
const didLoadSuccessfully = response.status === 200;
const shouldRefreshData = lastUpdate < Date.now() - CACHE_TIMEOUT;
const willExpireSoon = expirationDate < Date.now() + WARNING_THRESHOLD;
const showAdvancedOptions = user.preferences.advancedMode;

// ✅ Correct - Boolean properties in interfaces
interface PoamConfiguration {
  isEnabled: boolean;
  hasAutoRefresh: boolean;
  canModifySettings: boolean;
  shouldValidateInput: boolean;
  willSendNotifications: boolean;
  showDebugInfo: boolean;
}

// ✅ Correct - Boolean return types
function isValidPoamData(data: unknown): data is PoamData {
  return typeof data === "object" && data !== null && "id" in data;
}

function hasRequiredFields(poam: Partial<PoamData>): boolean {
  return !!(poam.title && poam.riskLevel && poam.dueDate);
}

function canUserAccessPoam(user: User, poam: PoamData): boolean {
  return user.permissions.includes("read") || poam.assignee === user.id;
}

// ❌ Avoid - Boolean variables not following Microsoft naming convention
const authenticated = checkAuthentication(); // Should be isAuthenticated
const permission = user.hasAdmin; // Should be hasPermission
const valid = validateData(input); // Should be isValid
const loading = fetchInProgress; // Should be isLoading
const enabled = feature.status; // Should be isEnabled
const visible = element.display !== "none"; // Should be isVisible

// ❌ Avoid - Boolean properties without proper prefix
interface BadConfiguration {
  enabled: boolean; // Should be isEnabled
  loading: boolean; // Should be isLoading
  valid: boolean; // Should be isValid
  authenticated: boolean; // Should be isAuthenticated
}
```

**SCREAMING_SNAKE_CASE for constants:**

```typescript
// ✅ Correct - Module-level constants
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 50;
const API_TIMEOUT_SECONDS = 30;

const CONMON_CONFIG = {
  REFRESH_INTERVAL_MS: 60000,
  MAX_VULNERABILITY_COUNT: 10000,
  DEFAULT_TIME_RANGE: "30d",
} as const;

// ✅ Correct - Static class constants
class CoverageCalculator {
  private static readonly MAX_COVERAGE_PERCENTAGE = 100;
  private static readonly MIN_COVERAGE_PERCENTAGE = 0;

  public calculate(data: CoverageData): number {
    const result = this.processData(data);
    return Math.min(result, CoverageCalculator.MAX_COVERAGE_PERCENTAGE);
  }
}

// ❌ Avoid - Regular variables with constant naming
function calculateScore(): number {
  let CURRENT_SCORE = 100; // This changes, shouldn't be SCREAMING_SNAKE_CASE
  CURRENT_SCORE += 50;
  return CURRENT_SCORE;
}
```

### 4.3 CCM Portal Specific Naming

**Use consistent naming for CCM Portal concepts:**

```typescript
// ✅ Good - Consistent CCM Portal terminology
interface PoamDetails {
  poamId: string;
  vulnerabilityId: string;
  riskLevel: VulnerabilityRiskLevel;
  remediationStatus: RemediationStatus;
}

interface ConMonCoverageData {
  scanCoveragePercentage: number;
  totalAssetCount: number;
  scannedAssetCount: number;
  lastScanDate: Date;
}

class VulnerabilityAssessmentService {
  public async getPoamsByRiskLevel(
    riskLevel: VulnerabilityRiskLevel
  ): Promise<PoamDetails[]> {
    // Implementation
  }
}

// ❌ Avoid - Inconsistent terminology
interface PlanOfActionMilestone {
  // Use consistent 'Poam' naming
  id: string;
  vulnId: string; // Use full 'vulnerabilityId'
  risk: string; // Use specific 'riskLevel' type
}

class VulnService {
  // Use full 'VulnerabilityService'
  // Implementation
}
```

---

## 5. Type System Guidelines

### 5.1 Type Inference vs Explicit Types

**Let TypeScript infer simple types, be explicit for complex ones:**

```typescript
// ✅ Good - Let TypeScript infer obvious types
const userName = "john.doe"; // string inferred
const isActive = true; // boolean inferred
const itemCount = 42; // number inferred

// ✅ Good - Explicit types for complex scenarios
const coverageData: CoverageData[] = await fetchCoverageData();
const poamFilters: PoamFilterConfiguration = {
  riskLevels: ["high", "critical"],
  dateRange: { start: startDate, end: endDate },
  includeCompleted: false,
};

// ✅ Good - Always specify function return types
function calculateCoverageMetrics(data: CoverageData[]): CoverageMetrics {
  return {
    totalCount: data.length,
    averagePercentage:
      data.reduce((sum, item) => sum + item.percentage, 0) / data.length,
    lastUpdated: new Date(),
  };
}

async function fetchPoamData(filters: PoamFilters): Promise<PoamData[]> {
  const response = await apiClient.get("/poams", { params: filters });
  return response.data;
}

// ❌ Avoid - Unnecessary explicit types
const userName: string = "john.doe";
const isActive: boolean = true;
const itemCount: number = 42;

// ❌ Avoid - Missing return types
function calculateMetrics(data: CoverageData[]) {
  // Return type unclear
  return { total: data.length, average: 0 };
}
```

### 5.2 Interfaces vs Type Aliases

**Prefer interfaces for object types:**

```typescript
// ✅ Good - Use interfaces for object shapes
interface CoverageTableProps {
  data: CoverageData[];
  loading: boolean;
  onRefresh: () => void;
  onFilterChange: (filters: CoverageFilters) => void;
}

interface PoamItem {
  id: string;
  title: string;
  riskLevel: VulnerabilityRiskLevel;
  dueDate: Date;
  assignee?: string;
}

// ✅ Good - Interfaces can be extended
interface BasePoamItem {
  id: string;
  title: string;
}

interface DetailedPoamItem extends BasePoamItem {
  description: string;
  vulnerabilities: VulnerabilityItem[];
  remediationPlan: RemediationPlan;
}

// ✅ Good - Use type aliases for unions and primitives
type VulnerabilityRiskLevel = "low" | "medium" | "high" | "critical";
type ConMonViewMode = "grid" | "list" | "card";
type ApiResponse<T> = { data: T; status: number; message?: string };

// ❌ Avoid - Type aliases for simple object types
type CoverageTableProps = {
  data: CoverageData[];
  loading: boolean;
}; // Should be interface
```

### 5.3 Array Types

**Use T[] for simple types, Array<T> for complex types:**

```typescript
// ✅ Good - Simple array syntax
let poamIds: string[];
let coveragePercentages: number[];
let isActiveFlags: boolean[];
let coverageItems: CoverageData[];

// ✅ Good - Complex array syntax
let complexData: Array<{ id: string; metadata: PoamMetadata }>;
let unionArrays: Array<string | number>;
let nestedGeneric: Array<Promise<CoverageData>>;

// ✅ Good - Multi-dimensional simple arrays
let grid: number[][];
let cube: string[][][];

// ❌ Avoid - Unnecessary Array<T> for simple types
let ids: Array<string>; // Should be string[]
let flags: Array<boolean>; // Should be boolean[]
```

### 5.4 Undefined and Null Handling

**Use optional properties instead of |undefined:**

```typescript
// ✅ Good - Optional properties
interface PoamConfiguration {
  refreshInterval: number;
  maxItems: number;
  autoRefresh?: boolean; // Optional, implicitly includes undefined
  theme?: "light" | "dark";
}

function processPoam(config: PoamConfiguration): void {
  const autoRefresh = config.autoRefresh ?? false; // Handle undefined
  const theme = config.theme ?? "light";
}

// ✅ Good - Optional parameters
function fetchCoverageData(filters?: CoverageFilters): Promise<CoverageData[]> {
  const actualFilters = filters ?? getDefaultFilters();
  return apiClient.get("/coverage", { params: actualFilters });
}

// ❌ Avoid - Explicit |undefined for optional properties
interface PoamConfiguration {
  refreshInterval: number;
  maxItems: number;
  autoRefresh: boolean | undefined; // Should be optional property
  theme: "light" | "dark" | undefined; // Should be optional property
}

// ❌ Avoid - Nullable type aliases
type MaybePoamData = PoamData | null; // Add null/undefined at usage site instead
```

### 5.5 any vs unknown

**Use unknown instead of any when possible:**

```typescript
// ✅ Good - Use unknown for truly unknown data
function processApiResponse(response: unknown): CoverageData[] {
  // Type guard to narrow the type
  if (isValidCoverageResponse(response)) {
    return response.data;
  }
  throw new Error("Invalid API response");
}

function isValidCoverageResponse(
  obj: unknown
): obj is { data: CoverageData[] } {
  return typeof obj === "object" && obj !== null && "data" in obj;
}

// ✅ Good - Specific types when structure is known
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

function handleCoverageResponse(response: ApiResponse<CoverageData[]>): void {
  // Type-safe access to response properties
  console.log(`Received ${response.data.length} coverage items`);
}

// ❌ Avoid - any without justification
function processResponse(response: any): CoverageData[] {
  // Unsafe
  return response.data; // No type checking
}

// ✅ Acceptable - any with justification and documentation
// This is an intentionally unsafe mock for testing
// tslint:disable-next-line:no-any
const mockCoverageService = {
  getCoverage: () => Promise.resolve([]),
} as any as CoverageService;
```

---

## 6. Control Structures

### 6.1 Conditional Statements

**Always use braces, even for single statements:**

```typescript
// ✅ Good - Always use braces
if (poamData.length === 0) {
  return getDefaultMessage();
}

if (coverage.percentage < threshold) {
  logWarning("Coverage below threshold");
  sendAlert();
}

for (const item of coverageData) {
  if (item.isValid) {
    processItem(item);
  }
}

// ❌ Avoid - Missing braces
if (poamData.length === 0) return getDefaultMessage();

if (coverage.percentage < threshold) logWarning("Coverage below threshold");

for (const item of coverageData) if (item.isValid) processItem(item);
```

**Use triple equals (===) for comparisons:**

```typescript
// ✅ Good - Strict equality
if (riskLevel === "high") {
  escalatePoam(poam);
}

if (coveragePercentage !== 0) {
  updateDisplay(coveragePercentage);
}

// ❌ Avoid - Loose equality
if (riskLevel == "high") {
  // Type coercion issues
  escalatePoam(poam);
}

// ✅ Exception - Null checks can use ==
if (poamData == null) {
  // Covers both null and undefined
  return [];
}
```

### 6.2 Loops and Iteration

**Prefer for-of for arrays, use appropriate loop types:**

```typescript
// ✅ Good - for-of for array values
for (const poam of poamList) {
  processPoam(poam);
}

// ✅ Good - for-of with entries when index is needed
for (const [index, poam] of poamList.entries()) {
  console.log(`Processing POAM ${index + 1}: ${poam.title}`);
}

// ✅ Good - for-in with proper filtering for objects
for (const key in poamSettings) {
  if (poamSettings.hasOwnProperty(key)) {
    console.log(`${key}: ${poamSettings[key]}`);
  }
}

// ✅ Better - Object methods for objects
for (const [key, value] of Object.entries(poamSettings)) {
  console.log(`${key}: ${value}`);
}

// ❌ Avoid - for-in on arrays
for (const index in poamList) {
  // index is a string, not number!
  processPoam(poamList[index]);
}
```

### 6.3 Exception Handling

**Always throw Error instances:**

```typescript
// ✅ Good - Throw Error instances
function validatePoamData(data: unknown): asserts data is PoamData {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid POAM data: expected object");
  }

  if (!("id" in data) || typeof data.id !== "string") {
    throw new Error("Invalid POAM data: missing or invalid id");
  }
}

// ✅ Good - Custom error types
class PoamValidationError extends Error {
  constructor(message: string, public readonly field: string) {
    super(message);
    this.name = "PoamValidationError";
  }
}

function processPoam(data: PoamData): void {
  if (!data.title) {
    throw new PoamValidationError("POAM title is required", "title");
  }
}

// ❌ Avoid - Throwing non-Error values
throw "Invalid data"; // No stack trace
throw { message: "Error occurred" }; // Not an Error instance
```

**Handle exceptions appropriately:**

```typescript
// ✅ Good - Specific error handling
async function fetchPoamData(id: string): Promise<PoamData> {
  try {
    const response = await apiClient.get(`/poams/${id}`);
    return response.data;
  } catch (error: unknown) {
    // Assert error is Error instance
    if (error instanceof Error) {
      logger.error(`Failed to fetch POAM ${id}:`, error.message);
    }
    throw error; // Re-throw for caller to handle
  }
}

// ✅ Good - Keep try blocks focused
async function processPoamBatch(ids: string[]): Promise<ProcessResult[]> {
  const results: ProcessResult[] = [];

  for (const id of ids) {
    let poamData: PoamData;

    try {
      poamData = await fetchPoamData(id); // Only the throwing operation
    } catch (error: unknown) {
      results.push({ id, success: false, error: String(error) });
      continue;
    }

    // Non-throwing operations outside try block
    const processedData = transformPoamData(poamData);
    results.push({ id, success: true, data: processedData });
  }

  return results;
}

// ❌ Avoid - Catching all errors without specific handling
try {
  await someOperation();
} catch (error: unknown) {
  // Swallows all errors - BAD!
  console.log("An error occurred");
}
```

---

## 7. Comments and Documentation

### 7.1 JSDoc Requirements

**Document all public APIs with JSDoc:**

````typescript
/**
 * Service for managing ConMon coverage data and calculations.
 * Handles fetching, processing, and caching of vulnerability scan coverage information.
 */
export class CoverageService {
  /**
   * Calculates the coverage percentage for a given dataset.
   *
   * @param coverageData - Array of coverage data points to analyze
   * @param options - Configuration options for calculation
   * @returns The calculated coverage percentage (0-100)
   * @throws {Error} When coverage data is invalid or empty
   *
   * @example
   * ```typescript
   * const service = new CoverageService();
   * const percentage = service.calculateCoverage(data, { includePartial: true });
   * console.log(`Coverage: ${percentage}%`);
   * ```
   */
  public calculateCoverage(
    coverageData: CoverageData[],
    options: CoverageCalculationOptions = {}
  ): number {
    if (coverageData.length === 0) {
      throw new Error("Coverage data cannot be empty");
    }

    // Implementation
    return 0;
  }

  /**
   * Fetches coverage data for the specified time range.
   *
   * @param startDate - Start of the time range to query
   * @param endDate - End of the time range to query
   * @param filters - Optional filters to apply to the query
   * @returns Promise resolving to coverage data array
   */
  public async getCoverageData(
    startDate: Date,
    endDate: Date,
    filters?: CoverageFilters
  ): Promise<CoverageData[]> {
    // Implementation
    return [];
  }
}
````

**Use proper JSDoc formatting:**

```typescript
/**
 * Represents a POAM (Plan of Action and Milestones) item in the ConMon system.
 *
 * POAMs track vulnerability remediation efforts and provide milestone tracking
 * for security compliance requirements.
 */
interface PoamItem {
  /** Unique identifier for the POAM */
  id: string;

  /** Human-readable title describing the vulnerability or issue */
  title: string;

  /**
   * Risk level assessment for the vulnerability.
   * Determines prioritization and escalation procedures.
   */
  riskLevel: VulnerabilityRiskLevel;

  /** Target completion date for remediation efforts */
  dueDate: Date;

  /**
   * Optional assignee responsible for POAM completion.
   * If undefined, POAM is unassigned and available for assignment.
   */
  assignee?: string;
}
```

### 7.2 Implementation Comments

**Use // comments for implementation details:**

```typescript
export class PoamProcessor {
  public async processBatch(poams: PoamItem[]): Promise<ProcessResult[]> {
    // Process POAMs in smaller chunks to avoid memory pressure
    const BATCH_SIZE = 100;
    const results: ProcessResult[] = [];

    for (let i = 0; i < poams.length; i += BATCH_SIZE) {
      const batch = poams.slice(i, i + BATCH_SIZE);

      // Use parallel processing for I/O bound operations
      const batchResults = await Promise.all(
        batch.map((poam) => this.processPoam(poam))
      );

      results.push(...batchResults);

      // Brief pause between batches to prevent API rate limiting
      await this.delay(100);
    }

    return results;
  }

  private async processPoam(poam: PoamItem): Promise<ProcessResult> {
    // Validate POAM data before processing
    if (!this.isValidPoam(poam)) {
      return { success: false, error: "Invalid POAM data" };
    }

    // Implementation continues...
    return { success: true };
  }
}
```

**Avoid redundant comments:**

```typescript
// ✅ Good - Comments add value
function calculateRiskScore(vulnerability: VulnerabilityData): number {
  // Use CVSS base score as starting point, then apply environmental factors
  let score = vulnerability.cvssBaseScore;

  // Increase score for vulnerabilities in production environments
  if (vulnerability.environment === "production") {
    score *= 1.5;
  }

  return Math.min(score, 10); // Cap at maximum CVSS score
}

// ❌ Avoid - Comments that just restate the code
function calculateRiskScore(vulnerability: VulnerabilityData): number {
  // Declare score variable and assign CVSS base score
  let score = vulnerability.cvssBaseScore;

  // Check if environment equals production
  if (vulnerability.environment === "production") {
    // Multiply score by 1.5
    score *= 1.5;
  }

  // Return the minimum of score and 10
  return Math.min(score, 10);
}
```

---

## 8. Formatting and Style

### 8.1 String Literals

**Use single quotes for strings:**

```typescript
// ✅ Good - Single quotes
const errorMessage = "Failed to load POAM data";
const apiEndpoint = "/api/v1/coverage";
const userRole = "administrator";

// ✅ Good - Template literals for interpolation
const welcomeMessage = `Welcome, ${userName}! You have ${unreadCount} notifications.`;
const apiUrl = `${baseUrl}/poams/${poamId}/details`;

// ✅ Good - Template literals for multi-line strings
const sqlQuery = `
  SELECT p.id, p.title, p.risk_level, p.due_date
  FROM poams p
  WHERE p.status = 'active'
    AND p.risk_level IN ('high', 'critical')
  ORDER BY p.due_date ASC
`;

// ❌ Avoid - Double quotes
const errorMessage = "Failed to load POAM data";
const apiEndpoint = "/api/v1/coverage";

// ❌ Avoid - String concatenation when template literals are better
const message = "Hello " + userName + ", you have " + count + " items.";
```

### 8.2 Number Literals

**Use appropriate number formats:**

```typescript
// ✅ Good - Standard decimal notation
const maxRetryCount = 3;
const timeoutSeconds = 30;
const coverageThreshold = 0.85;

// ✅ Good - Hex notation (lowercase)
const statusColor = 0xff0000; // Red
const flagValue = 0x01;

// ✅ Good - Binary notation
const permissions = 0b1010; // Read and execute permissions

// ❌ Avoid - Leading zeros for decimal (looks like octal)
const count = 0123; // Confusing - is this octal?

// ✅ Better - Explicit octal notation
const octalValue = 0o123;
```

### 8.3 Function Formatting

**Format functions consistently:**

```typescript
// ✅ Good - Function formatting
function calculateCoverageMetrics(
  data: CoverageData[],
  options: CalculationOptions
): CoverageMetrics {
  // Single blank line for logical grouping
  const totalItems = data.length;
  const validItems = data.filter((item) => item.isValid);

  const percentage = (validItems.length / totalItems) * 100;

  return {
    totalCount: totalItems,
    validCount: validItems.length,
    percentage: Math.round(percentage * 100) / 100,
  };
}

// ✅ Good - Arrow function formatting
const processPoamData = (poams: PoamItem[]): ProcessedPoam[] => {
  return poams
    .filter((poam) => poam.isActive)
    .map((poam) => ({
      id: poam.id,
      title: poam.title,
      priority: calculatePriority(poam),
    }));
};

// ❌ Avoid - Inconsistent spacing
function calculateMetrics(
  data: CoverageData[],
  options: CalculationOptions
): CoverageMetrics {
  const total = data.length;
  return { totalCount: total };
}
```

---

## 9. Type Assertion and Coercion

### 9.1 Type Assertions

**Use type assertions sparingly and document why:**

```typescript
// ✅ Good - Type assertion with explanation
// API response is guaranteed to have these fields by API contract
const poamData = (response.data as PoamApiResponse).poams;

// User input is validated by form validation before reaching this point
const validatedInput = userInput as ValidatedPoamInput;

// ✅ Good - Runtime check when possible
function isPoamData(obj: unknown): obj is PoamData {
  return (
    typeof obj === "object" && obj !== null && "id" in obj && "title" in obj
  );
}

if (isPoamData(responseData)) {
  // Type is narrowed, no assertion needed
  processPoam(responseData);
}

// ❌ Avoid - Assertion without justification
const poamData = response.data as PoamData; // Why is this safe?

// ❌ Avoid - Double assertions
const unsafeData = data as unknown as PoamData; // Usually indicates design issue
```

**Use 'as' syntax, not angle bracket syntax:**

```typescript
// ✅ Good - 'as' syntax
const element = document.getElementById("coverage-chart") as HTMLCanvasElement;
const poamCount = (response.metadata as ResponseMetadata).totalCount;

// ❌ Avoid - Angle bracket syntax
const element = <HTMLCanvasElement>document.getElementById("coverage-chart");
const poamCount = (<ResponseMetadata>response.metadata).totalCount;
```

### 9.2 Type Coercion

**Use explicit coercion functions:**

```typescript
// ✅ Good - Explicit coercion
const userIdString = String(userId);
const isEnabled = Boolean(configuration.featureFlag);
const itemCount = Number(userInput);

// Validate number conversion
if (!isFinite(itemCount)) {
  throw new Error("Invalid number input");
}

// ✅ Good - Double negation for boolean conversion when clear
const hasItems = !!poamList.length;
const isValidData = !!validationResult;

// ❌ Avoid - Implicit coercion with + operator
const numericValue = +stringValue; // Easy to miss in code review

// ❌ Avoid - String concatenation for conversion
const stringValue = someNumber + ""; // Unclear intent
```

---

## 10. Advanced Type System Features

### 10.1 Generics

**Use generics appropriately for reusability:**

```typescript
// ✅ Good - Generic utility interfaces
interface ApiResponse<TData> {
  data: TData;
  status: number;
  message?: string;
  timestamp: string;
}

interface ServiceResult<TSuccess, TError = Error> {
  success: boolean;
  data?: TSuccess;
  error?: TError;
}

// ✅ Good - Generic functions
function createCacheService<TKey, TValue>(
  keySerializer: (key: TKey) => string
): CacheService<TKey, TValue> {
  return new CacheService(keySerializer);
}

// ✅ Good - Constrained generics
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entity: T,
  updates: Partial<Omit<T, "id">>
): T {
  return { ...entity, ...updates };
}

// ✅ Good - Generic type parameter naming
// Single letter for simple cases
function identity<T>(value: T): T {
  return value;
}

// Descriptive names for complex cases
interface Repository<TEntity, TKey, TFilters> {
  find(id: TKey): Promise<TEntity | null>;
  search(filters: TFilters): Promise<TEntity[]>;
  save(entity: TEntity): Promise<void>;
}
```

### 10.2 Utility Types

**Use built-in utility types effectively:**

```typescript
// ✅ Good - Built-in utility types
interface PoamItemComplete {
  id: string;
  title: string;
  description: string;
  riskLevel: VulnerabilityRiskLevel;
  dueDate: Date;
  assignee: string;
  status: PoamStatus;
}

// Create partial version for updates
type PoamItemUpdate = Partial<Omit<PoamItemComplete, "id">>;

// Create version without sensitive data
type PublicPoamItem = Omit<PoamItemComplete, "assignee" | "description">;

// Create required subset
type PoamItemSummary = Pick<PoamItemComplete, "id" | "title" | "riskLevel">;

// ✅ Good - Custom utility types when needed
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface PoamItemWithRequiredAssignee
  extends RequiredFields<PoamItemComplete, "assignee"> {}

// ✅ Good - Conditional types for advanced scenarios
type ApiResponseData<T> = T extends { data: infer U } ? U : never;
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;
```

---

## 11. React/JSX Specific Guidelines

### 11.1 Component Definition

**Use function components with TypeScript:**

```typescript
// ✅ Good - Function component with proper typing
interface CoverageTableProps {
  data: CoverageData[];
  loading: boolean;
  onRefresh: () => void;
  onItemSelect: (item: CoverageData) => void;
  className?: string;
}

export const CoverageTable: React.FC<CoverageTableProps> = ({
  data,
  loading,
  onRefresh,
  onItemSelect,
  className,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = useCallback(
    (item: CoverageData) => {
      onItemSelect(item);
      setSelectedItems((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    },
    [onItemSelect]
  );

  if (loading) {
    return <div className="loading-spinner">Loading coverage data...</div>;
  }

  return (
    <div className={`coverage-table ${className || ""}`}>
      {data.map((item) => (
        <div
          key={item.id}
          className="coverage-item"
          onClick={() => handleItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
```

### 11.2 Event Handlers

**Type event handlers properly:**

```typescript
// ✅ Good - Properly typed event handlers
interface PoamFormProps {
  initialData?: Partial<PoamData>;
  onSubmit: (data: PoamData) => Promise<void>;
  onCancel: () => void;
}

export const PoamForm: React.FC<PoamFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<PoamFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    riskLevel: initialData?.riskLevel || "medium",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value as VulnerabilityRiskLevel,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      await onSubmit(formData as PoamData);
    } catch (error) {
      console.error("Failed to submit POAM:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="POAM Title"
      />
      <select
        name="riskLevel"
        value={formData.riskLevel}
        onChange={handleSelectChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </form>
  );
};
```

---

## 12. Testing Guidelines

### 12.1 Test Naming and Structure

**Use descriptive test names:**

```typescript
// ✅ Good - Descriptive test names following BDD pattern
describe("CoverageCalculationService", () => {
  describe("calculateCoveragePercentage", () => {
    it("should return 100% when all assets are scanned", () => {
      // Arrange
      const service = new CoverageCalculationService();
      const coverageData: CoverageData[] = [
        { assetId: "1", isScanned: true },
        { assetId: "2", isScanned: true },
        { assetId: "3", isScanned: true },
      ];

      // Act
      const result = service.calculateCoveragePercentage(coverageData);

      // Assert
      expect(result).toBe(100);
    });

    it("should return 0% when no assets are scanned", () => {
      // Arrange
      const service = new CoverageCalculationService();
      const coverageData: CoverageData[] = [
        { assetId: "1", isScanned: false },
        { assetId: "2", isScanned: false },
      ];

      // Act
      const result = service.calculateCoveragePercentage(coverageData);

      // Assert
      expect(result).toBe(0);
    });

    it("should throw error when coverage data is empty", () => {
      // Arrange
      const service = new CoverageCalculationService();
      const emptyCoverageData: CoverageData[] = [];

      // Act & Assert
      expect(() =>
        service.calculateCoveragePercentage(emptyCoverageData)
      ).toThrow("Coverage data cannot be empty");
    });
  });
});

// ❌ Avoid - Unclear test names
describe("CoverageCalculationService", () => {
  it("test1", () => {
    /* ... */
  });
  it("should work", () => {
    /* ... */
  });
  it("coverage test", () => {
    /* ... */
  });
});
```

### 12.2 Mock Typing

**Type mocks properly:**

```typescript
// ✅ Good - Properly typed mocks
interface MockCoverageService {
  getCoverageData: jest.MockedFunction<
    (filters: CoverageFilters) => Promise<CoverageData[]>
  >;
  calculateMetrics: jest.MockedFunction<
    (data: CoverageData[]) => CoverageMetrics
  >;
}

describe("ConMonDashboard", () => {
  let mockCoverageService: MockCoverageService;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockCoverageService = {
      getCoverageData: jest.fn(),
      calculateMetrics: jest.fn(),
    };

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as jest.Mocked<Logger>;
  });

  it("should display coverage data when loaded successfully", async () => {
    // Arrange
    const mockData: CoverageData[] = [
      { id: "1", percentage: 85, lastScan: new Date() },
    ];

    mockCoverageService.getCoverageData.mockResolvedValue(mockData);
    mockCoverageService.calculateMetrics.mockReturnValue({
      averagePercentage: 85,
      totalAssets: 100,
      scannedAssets: 85,
    });

    // Act
    const dashboard = new ConMonDashboard(mockCoverageService, mockLogger);
    const result = await dashboard.loadData({ timeRange: "30d" });

    // Assert
    expect(result.data).toEqual(mockData);
    expect(mockCoverageService.getCoverageData).toHaveBeenCalledWith({
      timeRange: "30d",
    });
    expect(mockLogger.info).toHaveBeenCalledWith(
      "Coverage data loaded successfully"
    );
  });
});
```

---

## 13. Disallowed Features and Patterns

### 13.1 Forbidden Language Features

**Never use these TypeScript/JavaScript features:**

```typescript
// ❌ NEVER use - var declarations
var globalVar = "bad"; // Use const or let instead

// ❌ NEVER use - with statements
with (someObject) {
  property = "value"; // Confusing and error-prone
}

// ❌ NEVER use - eval or Function constructor
eval("someCode()"); // Security risk
const fn = new Function("return someValue;"); // Security risk

// ❌ NEVER use - Automatic Semicolon Insertion reliance
function broken() {
  return; // ASI inserts semicolon here
  {
    value: "this will not work";
  }
}

// ✅ Good - Explicit semicolons
function working(): { value: string } {
  return {
    value: "this works correctly",
  };
}

// ❌ NEVER use - const enum
const enum Colors { // Use regular enum instead
  Red,
  Green,
  Blue,
}

// ✅ Good - Regular enum
enum Colors {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

// ❌ NEVER use - Wrapper constructors for primitives
const str = new String("text"); // typeof str === 'object', not 'string'
const num = new Number(42); // typeof num === 'object', not 'number'
const bool = new Boolean(false); // bool is truthy!

// ✅ Good - Coercion functions without new
const str = String(42); // '42'
const num = Number("42"); // 42
const bool = Boolean(0); // false
```

### 13.2 Discouraged Patterns

**Avoid these patterns:**

```typescript
// ❌ Avoid - Modifying built-in prototypes
Array.prototype.myCustomMethod = function () {
  /* ... */
};
String.prototype.format = function () {
  /* ... */
};

// ❌ Avoid - @ts-ignore comments
// @ts-ignore
const result = someUntypedLibrary.unknownMethod();

// ✅ Better - Proper type declaration or assertion with comment
// This library doesn't provide types, but API is documented
const result = (someUntypedLibrary as any).unknownMethod() as ResultType;

// ❌ Avoid - Non-null assertion without justification
const element = document.getElementById("my-element")!; // What if element is null?

// ✅ Better - Proper null check
const element = document.getElementById("my-element");
if (!element) {
  throw new Error("Required element not found");
}

// ❌ Avoid - Implicit any in catch blocks
try {
  await someOperation();
} catch (error) {
  // error is 'any'
  console.log(error.message); // No type safety
}

// ✅ Better - Explicit error handling
try {
  await someOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Unknown error occurred");
  }
}
```

---

## 14. CCM Portal Integration Guidelines

### 14.1 ConMon Specific Patterns

**Follow ConMon naming conventions:**

```typescript
// ✅ Good - ConMon specific interfaces
interface ConMonDashboardData {
  coverageMetrics: CoverageMetrics;
  poamSummary: PoamSummary;
  vulnerabilityTrends: VulnerabilityTrend[];
  complianceScore: ComplianceScore;
}

interface PoamRemediationPlan {
  poamId: string;
  milestones: RemediationMilestone[];
  estimatedCompletionDate: Date;
  assignedTeam: string;
  riskMitigationSteps: RiskMitigationStep[];
}

// ✅ Good - Vulnerability-specific types
type VulnerabilitySeverity =
  | "informational"
  | "low"
  | "medium"
  | "high"
  | "critical";
type ScanType = "authenticated" | "unauthenticated" | "compliance";
type AssetType =
  | "server"
  | "workstation"
  | "network_device"
  | "database"
  | "application";
```

### 14.2 API Integration Patterns

**Standard API service patterns:**

```typescript
// ✅ Good - Consistent API service structure
export class ConMonApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: Logger,
    private readonly config: ApiConfig
  ) {}

  public async getCoverageData(
    filters: CoverageFilters
  ): Promise<ServiceResult<CoverageData[], ApiError>> {
    try {
      const response = await this.httpClient.get<ApiResponse<CoverageData[]>>(
        "/api/v1/coverage",
        { params: this.sanitizeFilters(filters) }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: unknown) {
      this.logger.error("Failed to fetch coverage data:", error);

      return {
        success: false,
        error: this.handleApiError(error),
      };
    }
  }

  public async createPoam(
    poamData: CreatePoamRequest
  ): Promise<ServiceResult<PoamData, ValidationError[]>> {
    // Validate input before sending
    const validationErrors = this.validatePoamData(poamData);
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors,
      };
    }

    try {
      const response = await this.httpClient.post<ApiResponse<PoamData>>(
        "/api/v1/poams",
        poamData
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: unknown) {
      this.logger.error("Failed to create POAM:", error);

      return {
        success: false,
        error: [this.handleApiError(error)],
      };
    }
  }

  private sanitizeFilters(filters: CoverageFilters): Record<string, unknown> {
    // Remove undefined values and format dates
    const sanitized: Record<string, unknown> = {};

    if (filters.startDate) {
      sanitized.startDate = filters.startDate.toISOString();
    }

    if (filters.endDate) {
      sanitized.endDate = filters.endDate.toISOString();
    }

    if (filters.riskLevels?.length > 0) {
      sanitized.riskLevels = filters.riskLevels.join(",");
    }

    return sanitized;
  }
}
```

---

## 15. Summary and Checklist

### 15.1 Quick Reference Checklist

- [ ] Use `const`/`let` instead of `var`
- [ ] Single quotes for strings, template literals for interpolation
- [ ] camelCase for variables/functions, PascalCase for types/classes, SCREAMING_SNAKE_CASE for constants
- [ ] Always specify function return types
- [ ] Use interfaces for object types, type aliases for unions/primitives
- [ ] Prefer `unknown` over `any` when possible
- [ ] Use triple equals (`===`) for comparisons
- [ ] Always use braces for control structures
- [ ] Document public APIs with JSDoc
- [ ] Group and order imports consistently
- [ ] Use named exports instead of default exports
- [ ] Handle exceptions with proper Error instances
- [ ] Use type assertions sparingly with documentation
- [ ] Follow React component typing patterns for TSX files

### 15.2 Integration with Existing Standards

This TypeScript style guide complements the existing CCM Portal standards:

- **Integrates with C# practices**: Similar naming conventions and code organization principles
- **Supports Azure DevOps workflow**: Consistent with work item and PR review processes
- **Aligns with accessibility requirements**: Type safety supports screen reader compatibility
- **Follows project guidelines**: Emphasizes concise, readable code with minimal changes

### 15.3 Enforcement

- Configure TypeScript compiler with strict mode enabled
- Use ESLint with TypeScript rules for automated checking
- Include style guide compliance in code review process
- Document exceptions and project-specific deviations clearly

---

**Remember:** The goal is consistent, maintainable code that helps the team work effectively on the CCM Portal project. When in doubt, prioritize clarity and consistency with existing codebase patterns.
