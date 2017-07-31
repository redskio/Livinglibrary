export class Outlet {

  public $key: string;

  constructor(
    public title: string,
    public latitude: number,
    public longitude: number,
    public addr: string,
    public photo: string,
    public url: string,
    public tel: string
  ) {}

}
