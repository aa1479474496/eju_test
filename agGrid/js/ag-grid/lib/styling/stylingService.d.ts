// Type definitions for ag-grid v18.0.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { CellClassParams, ColDef } from "../entities/colDef";
export declare class StylingService {
    private expressionService;
    processAllCellClasses(colDef: ColDef, params: any, onApplicableClass: (className: string) => void, onNotApplicableClass?: (className: string) => void): void;
    processClassRules(classRules: {
        [cssClassName: string]: (Function | string);
    }, params: CellClassParams, onApplicableClass: (className: string) => void, onNotApplicableClass?: (className: string) => void): void;
    processStaticCellClasses(colDef: ColDef, params: CellClassParams, onApplicableClass: (className: string) => void): void;
}
