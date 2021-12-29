declare namespace API {
  type Teacher = {
    department?: string;
    id?: number;
    idCard?: string;
    name?: string;
    staffCode?: string;
  };

  type getPdqUsingGETParams = {
    /** staffCode */
    staffCode: string;
    /** idCard */
    idCard: string;
  };

  type getTeacherUsingGETParams = {
    /** staffCode */
    staffCode: string;
    /** idCard */
    idCard: string;
  };
  type PDP={
    id?: string;
    name?: string;
    money?: string;
    avater?: string;
  }
}
