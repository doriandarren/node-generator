

/**
 * Format Migration
 * @returns 
 */
export const formatDateTimeForMigration = () => {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
};