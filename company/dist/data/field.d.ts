/**
 * 字段类型
 */
export declare enum FieldType {
    /**
     * 字符串
     */
    String = 1,
    /**
     * 数值型
     */
    Number = 2
}
/**
 * 字段
 * @remarks
 * TODO: a lot of things to be done
 */
export declare class Field {
    /**
     * 字段名称
     */
    name: string;
    radius: string;
    company_introduction: string;
    company_prisector: string;
    company_auxsector: string;
    company_fourthsector: string;
    company_categary: string;
    company_auth: string;
    company_time: string;
    company_address: string;
    company_item: string;
    company_year: string;
    company_remark: string;
    company_radius: number;
    teacher_name: string;
    teacher_position: string;
    teacher_research: string;
    teacher_college: string;
    teacher_prisectorsector: string;
    teacher_program: string;
    teacher_auxsectorsector: string;
    teacher_fourthsector: string;
    teacher_remark: string;
    teacher_radius: number;
    teacher_evaluate: string;
    pro_people: string;
    pro_position: string;
    pro_unit: string;
    pro_corcomp: string;
    pro_technology: string;
    pro_introduction: string;
    pro_compeople: string;
    pro_phone: string;
    pro_year: string;
    pro_prisectorsector: string;
    pro_auxsectorsector: string;
    pro_remark: string;
    pro_fourthsector: string;
    instrument_address: string;
    instrument_category: string;
    instrument_pay: string;
    instrument_prisectorsector: string;
    instrument_auxsectorsector: string;
    instrument_contact: string;
    instrument_phone: string;
    instrument_reuse: string;
    instrument_fourthsector: string;
    instrument_remark: string;
    ach_people: string;
    ach_unit: string;
    ach_fourthsector: string;
    ach_keywords: string;
    ach_clc: string;
    ach_sc: string;
    ach_introduction: string;
    ach_categary: string;
    ach_inyear: string;
    ach_researchtime: string;
    ach_evaluform: string;
    ach_level: string;
    ach_prisectorsector: string;
    ach_auxsectorsector: string;
    ach_remark: string;
    /**
     *
     * 字段别名
     */
    alias: string;
    /**
     * 字段类型
     */
    type: FieldType;
}
