export class UserDTO {
  cd_user?: number;
  nm_user: string;
  ds_email: string;
  nb_telephone: string;
  url_image: string;

  constructor({
    cd_user,
    nm_user,
    ds_email,
    nb_telephone,
    url_image,
  }: {
    cd_user?: number;
    nm_user: string;
    ds_email: string;
    nb_telephone: string;
    url_image: string;
  }) {
    if (cd_user) this.cd_user = cd_user;
    this.nm_user = nm_user;
    this.ds_email = ds_email;
    this.nb_telephone = nb_telephone;
    this.url_image = url_image;
  }
}
