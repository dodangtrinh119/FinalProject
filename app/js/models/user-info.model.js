/**
 * Created by nmtuan on 06-Jun-16.
 */
function UserInfo() {

    //Basic Infos
    this.name = [ "", "" ];
    this.gender = true;
    this.workInfo = {
        location : "",
        industry : ""
    };
    this.headline = "";

    this.profileUrl = "";
    this.profileImg = "images/profile-default-man.png";
    this.coverImg = "images/cover-default.png";
    this.summary = "";
    this.caredCauses = [];
    this.education = [];
    this.experience = [];
    this.skills = [];
    this.followers = 0;
    this.isInfluencer = true;

    this.supportedOrganizations = [];
};