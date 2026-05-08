/**
 * The Creator and Evaluator dashboards have been combined into a
 * single dashboard with both role pills shown in the header. This
 * file simply re-exports the combined dashboard so the existing
 * /__mockup/preview/.../EvaluatorDashboard URL keeps working and
 * shows the same combined Overview as the Creator URL.
 */
export { default } from './CreatorDashboard'
