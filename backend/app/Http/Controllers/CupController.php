<?php

namespace App\Http\Controllers;

use App\Account;
use App\Examinations;
use App\Exercise;
use App\ReportExaminations;
use App\Submission;
use Illuminate\Http\Request;

class CupController
{
    public static function CalcCup($id)
    {

        $account = Account::where('id', $id)->first();
        $tongCauHoi = Examinations::count(); // *****************
        $tongDiemSubmission = 0; // *****************
        $tongSoGioLamBaiTap = 0;

        $tongBaiTap = Exercise::count();
        $dsReportExaminations = ReportExaminations::where('username', $account->username)->get();
        $arrCauCauLamDc = [];
        $arrBTLamDc = [];
        $sub = Submission::where('username', $account->username)->where('score', '>', 8)->get();
        foreach ($sub as $ss) {
            $tongDiemSubmission += $ss->score;
            array_push($arrBTLamDc, $ss->exercise_code);
        }

        foreach ($dsReportExaminations as $ss) {
            $tongSoGioLamBaiTap += (int)$ss->time_work;
            foreach (explode(',', $ss->list_examination) as $s)
                array_push($arrCauCauLamDc, $s);
        }
        $tongSoLanSubmission = count($sub);
        $tongSoLanExam = count($dsReportExaminations);
        $tongCacCauHoiLamDuoc = count(array_unique($arrCauCauLamDc));
        $tongCacBaiTapLamDuoc = count(array_unique($arrBTLamDc));

        $tile1 = ($tongCacCauHoiLamDuoc / $tongCauHoi);
        $tile2 = $tongCacBaiTapLamDuoc / $tongBaiTap;
        $tile3 = $tongSoLanExam + $tongSoLanSubmission;
        $tile4 = ($tongCacCauHoiLamDuoc * 60) - $tongSoGioLamBaiTap;

        $code_cup = 0;
        $CPR = $tile1 * 100 + $tile2 * 150 + $tile3 * 1 + $tile4;

        if ($CPR < 50) {
            $code_cup = 0;
        }

        if ($CPR >= 50 && $CPR < 300) {
            $code_cup = 1;
        }
        if ($CPR >= 300 && $CPR < 1000) {
            $code_cup = 2;
        }
        if ($CPR >= 1000 && $CPR < 2000) {
            $code_cup = 3;
        }
        if ($CPR >= 2000 && $CPR < 3000) {
            $code_cup = 4;
        }

        if ($CPR >= 3000 && $CPR < 6000) {
            $code_cup = 6;
        }

        if ($CPR >= 6000 && $CPR < 10000) {
            $code_cup = 7;
        }

        Account::where('id', $id)->update([
            'code_cup' => $code_cup
        ]);
        return $CPR;
    }
}
